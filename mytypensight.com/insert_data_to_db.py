import psycopg2

conn = psycopg2.connect(
    dbname='mytypensight',
    user='postgres',
    password='Jrock007',
    host='localhost'
)

def insert_data(data):
    with conn.cursor() as cur:
        for entry in data:
            cur.execute(
                "INSERT INTO economic_indicators (country_id, year, indicator, value) VALUES (%s, %s, %s, %s)",
                (entry['country_id'], entry['year'], entry['indicator'], entry['value'])
            )
    conn.commit()

def main():
    with open('processed_data.json', 'r') as f:
        processed_data = json.load(f)
    insert_data(processed_data)

if __name__ == "__main__":
        main()
