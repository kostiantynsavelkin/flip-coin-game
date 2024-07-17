const express = require("express");
const router = express.Router();
//impot betController
const leaderController = require("../controllers/leaderboard.controller");
const auth = require("../middleware/auth.middleware");
//import middleware
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
//import validation for express-validater

// POST ==> leaderboard/get
router.post("/get", awaitHandlerFactory(leaderController.getLeaderBoardData));

/***********************************Export*******************************************/
module.exports = router;
