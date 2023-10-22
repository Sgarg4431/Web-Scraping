require("dotenv").config();

module.exports = {
  PDF: process.env.URL,
  URL: process.env.DATABASE_URL,
  ZOHO_URL:process.env.ZOHO_URL,
  AUTH_TOKEN:process.env.AUTH_TOKEN
};
