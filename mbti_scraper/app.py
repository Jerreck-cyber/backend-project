import scrapy

class MbtiSpider(scrapy.Spider):
    name = "mbti_spider"
    allowed_domains = ["16personalities.com"]
    start_urls = [
        'https://www.16personalities.com/country-profiles/global/world#global',
    ]

    def parse(self, response):
        # Since you provided a structure, we'll adjust to target specific elements within it
        countries = response.xpath('//div[contains(@class, "country-profile")]')
        
        for country in countries:
            country_name = country.xpath('.//div[@class="country-profile-name"]/text()').get()
            types = country.xpath('.//div[@class="country-profile-types"]//div[contains(@class, "type-name")]')
            data = {
                'country': country_name,
                'type_data': []
            }
            
            for t in types:
                type_name = t.xpath('.//span[@class="type-name"]/text()').get()
                type_percentage = t.xpath('.//span[@class="type-percentage"]/text()').get()
                data['type_data'].append({
                    'type': type_name,
                    'percentage': type_percentage
                })
            
            yield data

