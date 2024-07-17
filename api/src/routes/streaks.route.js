const express = require("express");
const router = express.Router();
//impot betController
const streaksController = require("../controllers/streaks.controller");
const auth = require("../middleware/auth.middleware");
//import middleware
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
//import validation for express-validater

// POST ==> streaks/get
router.post("/get", awaitHandlerFactory(streaksController.getStreaks));

// POST ==> streaks/add
router.post("/add", awaitHandlerFactory(streaksController.addStreaks));

// POST ==> streaks/disable
router.post("/disable", awaitHandlerFactory(streaksController.disableStreaks));

// POST ==> streaks/check
router.post("/check", awaitHandlerFactory(streaksController.checkStreaks));

// POST ==> streaks/checkaddorupdate
router.post(
  "/checkaddorupdate",
  awaitHandlerFactory(streaksController.checkAddOrUpdate)
);

/***********************************Export*******************************************/
module.exports = router;
