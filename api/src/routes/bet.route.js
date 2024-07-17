const express = require("express");
const router = express.Router();
//impot betController
const betController = require("../controllers/bet.controller");
const auth = require("../middleware/auth.middleware");
//import middleware
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
//import validation for express-validater

// POST ==> bet/getall
router.post("/getall", awaitHandlerFactory(betController.getBetData));

// POST ==> bet/add
router.post("/add", awaitHandlerFactory(betController.addBet));

// POST ==> bet/recent
router.post("/recent", awaitHandlerFactory(betController.getRecentBetData));

// POST ==> bet/stats
router.post("/stats", awaitHandlerFactory(betController.getStatsBetData));

// POST ==> bet/leaderboard
router.post(
  "/leaderboard",
  awaitHandlerFactory(betController.getLeaderBoardData)
);

// POST ==> bet/volume
router.post("/volume", awaitHandlerFactory(betController.getVolumeData));

// POST ==> bet/duplicate
router.post("/duplicate", awaitHandlerFactory(betController.checkDuplicate));

/***********************************Export*******************************************/
module.exports = router;
