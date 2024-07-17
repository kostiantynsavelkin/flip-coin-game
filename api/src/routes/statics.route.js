const express = require("express");
const router = express.Router();
//impot betController
const staticsController = require("../controllers/statics.controller");
const auth = require("../middleware/auth.middleware");
//import middleware
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
//import validation for express-validater

// POST ==> statics/get
router.post("/get", awaitHandlerFactory(staticsController.getStatics));

/***********************************Export*******************************************/
module.exports = router;
