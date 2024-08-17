from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Set up the Selenium WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

try:
    # Open the website
    driver.get('https://www.16personalities.com/country-profiles/global/world#global')

    # Wait for a few seconds to ensure the page loads fully
    time.sleep(5)

    # Print the title to confirm we're on the right page
    print("Page Title: ", driver.title)

    # Try using XPATH instead of CLASS_NAME
    WebDriverWait(driver, 60).until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'country-profile')]"))
    )

    # Scrape the data
    countries = driver.find_elements(By.XPATH, "//div[contains(@class, 'country-profile')]")
    mbti_data = []

    for country in countries:
        country_name = country.find_element(By.XPATH, ".//div[contains(@class, 'country-profile-name')]").text
        types = country.find_elements(By.XPATH, ".//div[contains(@class, 'country-profile-types')]")
        for type_element in types:
            type_name = type_element.find_element(By.XPATH, ".//div[contains(@class, 'type-name')]").text
            type_percentage = type_element.find_element(By.XPATH, ".//div[contains(@class, 'type-percentage')]").text
            mbti_data.append({
                'country': country_name,
                'type': type_name,
                'percentage': type_percentage
            })

    # Print or save the scraped data
    for data in mbti_data:
        print(data)

finally:
    # Close the WebDriver
    driver.quit()



