import scrapy


class MbtiSpiderSpider(scrapy.Spider):
    name = "mbti_spider"
    allowed_domains = ["16personalities.com"]
    start_urls = ["https://16personalities.com"]

    def parse(self, response):
        pass
