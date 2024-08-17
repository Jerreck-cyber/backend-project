import requests

API_BASE_URL = 'https://api.worldbank.org/v2'
indicators = ['NY.GDP.MKTP.CD', 'SP.POP.TOTL']  # Example indicators

def fetch_data(indicator, country, year):
    response = requests.get(f'{API_BASE_URL}/country/{country}/indicator/{indicator}?date={year}&format=json')
    data = response.json()
    return data

def main():
    country = 'US'  # Example country
    year = '2020'  # Example year
    for indicator in indicators:
        data = fetch_data(indicator, country, year)
        print(data)  # You can save this data or process it further

if __name__ == "__main__":
        main()
