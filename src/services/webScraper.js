const axios = require("axios");
const cheerio = require("cheerio");

// required web scaper class
class WebsiteScraper {
  constructor() {
    this.urls = [];
  }

  // function to add urls to urls array
  async addURL(url) {
    this.urls.push(url);
  }

  // function that would extract data of website using cheerio and axios
  async scrapeWebsites() {
    for (const url of this.urls) {
      try {
        const startTime = new Date();
        const response = await axios.get(url);

        if (response.status === 200) {
          const $ = cheerio.load(response.data);
          const title = $("title").text(); // extracting the title 
          const data = $("body").text().replace(/\s+/g, ' ').trim(); // removing extra spaces
          const Timestamp = startTime.toISOString();
          return { url, title, Timestamp, data };
        } else {
          console.log(
            "Failed to retrieve the web page",
            response.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
}

module.exports = WebsiteScraper;
