from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=False)
    page = browser.new_page()
    
    # Go to the world personality map page
    page.goto("https://www.16personalities.com/country-profiles/global/world#global")

    # Wait for the page to load
    page.wait_for_selector('.country-profile', timeout=60000)  # Wait for a long time if necessary

    # Example: Click on a country profile link
    elements = page.query_selector_all('.country-profile')

    for element in elements:
        # Click on the element to load the data
        element.click()
        
        # Wait for the data to load (adjust the selector according to the data container)
        page.wait_for_selector('.data-container', timeout=60000)
        
        # Extract the data
        country_name = page.query_selector('.country-name').inner_text()
        mbti_types = page.query_selector_all('.mbti-type')
        
        for mbti_type in mbti_types:
            type_name = mbti_type.query_selector('.type-name').inner_text()
            type_percentage = mbti_type.query_selector('.type-percentage').inner_text()
            print(f"Country: {country_name}, Type: {type_name}, Percentage: {type_percentage}")

    # Close the browser
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
