require("dotenv").config();
const AppError = require("../services/appError");
const WebsiteScraper = require("../services/webScraper");
const readURLsFromPDF = require("./readPdfFile");
const scrapModel = require("../models/scrapModel");
const axios = require("axios");
const config = require("../config/config");

// function to send data to Clique
const sendDataToClique = async (content) => {
  try {
    console.log(content);
    const cliqueApiEndpoint = config.ZOHO_URL; // Replace with your Clique API endpoint as suggested in doc
    // sending the post request with required headers
    const response = await axios.post(
      cliqueApiEndpoint,
      {
        data: [content],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: config.AUTH_TOKEN,
          environment: "development",
        },
      }
    );
    console.log("Data sent to Clique:");
  } catch (error) {
    console.error("Error sending data to Clique:");
    throw error;
  }
};

// scrap method to call the function of class and extraxt the required data
const scrap = async (req, res, next) => {
  try {
    const urls = await readURLsFromPDF();
    console.log(urls);
    for (let i = 0; i < urls.length; i++) {
      const webScraper = new WebsiteScraper();
      webScraper.addURL(urls[i]);
      const scrapedData = await webScraper.scrapeWebsites();
      if (scrapedData) {
        const requiredData = {
          url: urls[i],
          name: scrapedData.title,
          timestamp: scrapedData.Timestamp,
          data: scrapedData.data,
        };
        //saving the scraped data into DB
        await scrapModel.create(requiredData);
        //sending data to Clique
        await sendDataToClique(requiredData);
      }
    }
    return res.status(200).json({
      status: "success",
      message: "Data saved to Db",
    });
  } catch (error) {
    return next(new AppError(`Error: ${error}`, 500));
  }
};

module.exports = {
  scrap: scrap,
};
