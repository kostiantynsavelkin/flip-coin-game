const express = require("express");
const router = express.Router();
//impot betController
const signController = require("../controllers/sign.controller");
const auth = require("../middleware/auth.middleware");
//import middleware
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
//import validation for express-validater

// POST ==> sign/check
router.post("/check", awaitHandlerFactory(signController.getSign));

// POST ==> sign/add
router.post("/add", awaitHandlerFactory(signController.addSign));

/***********************************Export*******************************************/
module.exports = router;
