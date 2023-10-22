require("dotenv").config();
const fs = require("fs");
const pdf = require("pdf-parse");
const AppError = require("../services/appError");
const config = require("../config/config");

// function to extract the URLs from pdf file
const readURLsFromPDF = async (next) => {
  try {
    const dataBuffer = fs.readFileSync(config.PDF);
    const data = await pdf(dataBuffer);
    const text = data.text;
    let urls = [];
    
    // extracting the url which start from http or https or www
    const urlsMatch = text.match(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g);
    if (urlsMatch) {
      urls.push(
        ...urlsMatch.map((url) => {
          if (url.startsWith("www.")) {
            url = url.replace(/,$/, "");
            return "http://" + url;  // appending http in url which do not start with http
          } else {
            return url.replace(/,$/, ""); // Remove trailing comma if present
          }
        })
      );
    }
    return urls;
  } catch (error) {
    console.log(error);
    next(new AppError(`Error: ${error}`, 400));
  }
};

module.exports = readURLsFromPDF;
