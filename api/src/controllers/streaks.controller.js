const HttpException = require("../utils/HttpException.utils");
const StreaksModel = require("../models/streaks.model");

/*********************************Property Controller*********************************************/

const getStreaks = async (req, res, next) => {
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

  const streaks = await StreaksModel.getStreaksData({
    fromDate: fromDate,
    betType: req.body.betType,
    toDate: toDate,
  });
  let temp = [];

  console.log("result", streaks.result);

  streaks.result.map((item) => {
    const now = new Date();

    const time = new Date(item.timeStamp.toString());
    const seconds = now.getTime() - time.getTime();
    temp.push({
      betAddress: item.betAddress,
      streaks: item.streaks,
      time: (seconds / 1000).toFixed(0).toString(),
    });
  });

  if (!streaks.state) {
    throw new HttpException(200, "There is no data.");
  }

  res.send({
    type: "success",
    message: "success",
    result: temp,
  });
};

const addStreaks = async (req, res, next) => {
  const result = await StreaksModel.addStreaks({
    betAddress: req.body.betAddress,
    betType: req.body.betType,
    betAmount: req.body.betAmount,
    streaks: req.body.streaks,
    requestId: req.body.requestId,
  });

  if (result.affectedRows === 0) {
    throw new HttpException(400, "The addBet has been failed.");
  }

  res.send({
    type: "success",
    message: "successfull",
  });
};

const updateStreaks = async (req, res, next) => {
  const result = await StreaksModel.updateStreaks({
    betAddress: req.body.betAddress,
  });

  if (result.affectedRows === 0) {
    throw new HttpException(400, "The addBet has been failed.");
  }

  res.send({
    type: "success",
    message: "successfull",
  });
};

const disableStreaks = async (req, res, next) => {
  const result = await StreaksModel.disableStreaks({
    betAddress: req.body.betAddress,
  });

  if (result.affectedRows === 0) {
    throw new HttpException(400, "The addBet has been failed.");
  }

  res.send({
    type: "success",
    message: "successfull",
  });
};

const checkStreaks = async (req, res, next) => {
  const result = await StreaksModel.checkStreaks({
    betAddress: req.body.betAddress,
  });

  res.send({
    type: "success",
    result: result,
  });
};

const checkAddOrUpdate = async (req, res, next) => {
  const result = await StreaksModel.checkAddOrUpdate({
    betAddress: req.body.betAddress,
  });

  res.send({
    type: "success",
    result: result == 0 ? "update" : "add",
  });
};

/***********************************Export*******************************************/
module.exports = {
  getStreaks,
  addStreaks,
  updateStreaks,
  disableStreaks,
  checkStreaks,
  checkAddOrUpdate,
};
