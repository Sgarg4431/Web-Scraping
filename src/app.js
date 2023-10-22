require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const connectDb = require("./db/connectDb");


// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

require("./routes/index")(app);

// set port, listen for requests
const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await connectDb();
  console.log(`server started on ${port}`);
});

// handling Db error
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
