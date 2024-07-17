const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const fs = require("fs");
dotenv.config();
//import utils
const HttpException = require("./src/utils/HttpException.utils");
//import error middleware
const errorMiddleware = require("./src/middleware/errorMiddleware");
//import bet router
const betRouter = require("./src/routes/bet.route");
//import statics router
const staticsRouter = require("./src/routes/statics.route");
//import leader router
const leaderRouter = require("./src/routes/leader.route");
//import statics router
const streaksRouter = require("./src/routes/streaks.route");
//import sign router
const signRouter = require("./src/routes/sign.route");

// ###
// Init express
const fileUpload = require("express-fileupload");

const app = express();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("upload"));

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://www.letsgoflip.com",
    "https://letsgoflip.com",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
// Enable pre-flight
app.options("*", cors());
app.use(fileUpload());
app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
  })
);

app.use("/bet", betRouter);
app.use("/statics", staticsRouter);
app.use("/leaderboard", leaderRouter);
app.use("/streaks", streaksRouter);
app.use("/sign", signRouter);

/** SOCKET **/
const http = require("http");
const server = http.createServer(app);
/** SOCKET **/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.all("*", (req, res, next) => {
  const error = new HttpException(404, "Endpoint Not Found.");
  next(error);
});
// Error middleware
app.use(errorMiddleware);
// set port, listen for requests
const PORT = process.env.SERVERPORT;

server.listen(PORT || 9000, () =>
  console.log(`Server is running on port ${PORT}.`)
);

/***********************************Export*******************************************/
module.exports = app;
