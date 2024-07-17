const HttpException = require("../utils/HttpException.utils");
const BetModel = require("../models/bet.model");

/*********************************Property Controller*********************************************/

const getLeaderBoardData = async (req, res, next) => {
  const m = new Date();
  m.setDate(m.getDate());
  const toDate =
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getUTCDate()).slice(-2) +
    " " +
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2);

  m.setDate(m.getDate() - req.body.duration - 1);
  const fromDate =
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getUTCDate()).slice(-2) +
    " " +
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2);

  const leader = await BetModel.getLeaderboardData({
    fromDate: fromDate,
    betType: req.body.betType,
    toDate: toDate,
  });
  if (!leader.state) {
    throw new HttpException(200, "There is no data.");
  }

  res.send({
    type: "success",
    message: "success",
    result: leader.result,
  });
};

/***********************************Export*******************************************/
module.exports = {
  getLeaderBoardData,
};
