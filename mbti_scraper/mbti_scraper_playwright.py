import asyncio
from playwright.async_api import async_playwright
import csv

async def run(playwright):
    browser = await playwright.chromium.launch()
    page = await browser.new_page()

    # Open the website
    await page.goto("https://www.16personalities.com/country-profiles/global/world#global")

    # Wait for the page to load completely
    await page.wait_for_load_state('networkidle')

    # Identify and interact with the dropdowns
    async def select_dropdown(selector, value):
        await page.click(selector)
        await page.locator(f'text="{value}"').click()

    # Define the dropdown selectors and their possible values
    dropdown_combinations = [
        {"region": "World", "trait": "Extraverted vs. Introverted"},
        {"region": "World", "trait": "Intuitive vs. Observant"},
        # Add more combinations as needed
    ]

    # Prepare to store the results
    results = []

    # Loop through the combinations
    for combo in dropdown_combinations:
        await select_dropdown('#region-dropdown-selector', combo['region'])
        await select_dropdown('#trait-dropdown-selector', combo['trait'])
        
        # Wait for the data to update
        await page.wait_for_selector(".country-profile")

        # Scrape the data from the interactive map or list
        data_elements = await page.locator('.country-profile').all()
        for element in data_elements:
            country = await element.locator('.country-profile-name').inner_text()
            percentage = await element.locator('.country-profile-percentage').inner_text()
            results.append({
                'Region': combo['region'],
                'Trait': combo['trait'],
                'Country': country,
                'Percentage': percentage
            })

    # Save the results to a CSV file
    with open('mbti_data.csv', 'w', newline='') as csvfile:
        fieldnames = ['Region', 'Trait', 'Country', 'Percentage']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for result in results:
            writer.writerow(result)

    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())













