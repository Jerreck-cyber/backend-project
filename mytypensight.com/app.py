from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import psycopg2

app = Flask(__name__)

# Database connection function
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="your_database_name",  # Replace with your database name
        user="postgres",  # Replace with your database username
        password="Jrock007"  # Replace with your database password
    )
    return conn

# Function to scrape MBTI distribution data from the website
def scrape_mbti_distribution():
    url = "https://www.16personalities.com/country-profiles/global/world#global"
    response = requests.get(url)
    
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Debugging: Print out all div elements to inspect what was retrieved
    all_divs = soup.find_all('div')
    
    scraped_data = []
    
    for div in all_divs:
        div_content = div.get_text(strip=True)
        scraped_data.append(div_content)
    
    # Returning the organized data
    return scraped_data

# Flask route to scrape and return MBTI distribution data
@app.route('/scrape-mbti', methods=['GET'])
def scrape_and_store_mbti():
    data = scrape_mbti_distribution()
    
    if not data:
        return jsonify({"error": "Failed to scrape the MBTI distribution data"}), 500
    
    # Here you can also add logic to store the data in the database if needed
    # For now, we'll just return the data in the response
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)










