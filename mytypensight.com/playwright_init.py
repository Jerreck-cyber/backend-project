import psycopg2
from psycopg2 import sql
from playwright.sync_api import sync_playwright

def main():
    connection = psycopg2.connect(
        dbname="mytypensight",
        user="postgres",
        password="Jrock007",
        host="localhost"
    )
    cursor = connection.cursor()

    # Playwright scraping
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to Poland page
        page.goto("file:///mnt/data/Poland%20Personality%20Profile%20_%20Country%20Personality%20Profiles%20_%2016Personalities.htm")

        # Extracting data
        country_name = "Poland"
        population = page.query_selector("text=Population (est.):").text_content().split(": ")[1]
        respondents = page.query_selector("text=Respondents:").text_content().split(": ")[1]

        top_types = page.query_selector_all("li")
        top_personality_types = []
        for typ in top_types:
            personality_name = typ.query_selector("a").text_content()
            percentage = typ.query_selector("text= %").text_content().strip('%')
            top_personality_types.append((personality_name, percentage))

        # Insert into the database
        cursor.execute(
            sql.SQL("""
                INSERT INTO personality_types (country_id, population, respondents)
                VALUES (
                    (SELECT country_id FROM countries WHERE country_name = %s),
                    %s, %s
                ) RETURNING type_id;
            """),
            [country_name, population, respondents]
        )
        type_id = cursor.fetchone()[0]

        # Insert top personality types
        for name, percentage in top_personality_types:
            cursor.execute(
                sql.SQL("""
                    INSERT INTO top_personality_types (type_id, name, percentage)
                    VALUES (%s, %s, %s);
                """),
                [type_id, name, percentage]
            )

        # Commit the transaction
        connection.commit()
        cursor.close()
        connection.close()

        browser.close()

if __name__ == "__main__":
    main()













