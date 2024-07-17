const HttpException = require("../utils/HttpException.utils");
const BetModel = require("../models/bet.model");
const StaticsModel = require("../models/staticswin.model");
const StreaksModel = require("../models/streaks.model");

/*********************************Property Controller*********************************************/

const getBetData = async (req, res, next) => {
  const result = await BetModel.getBetAll();
  if (!result.state) {
    throw new HttpException(200, "There is no data.");
  }

  res.send({
    type: "success",
    message: "success",
    result: result.bet,
  });
};

const getRecentBetData = async (req, res, next) => {
  const result = await BetModel.getRecentBet();

  if (!result.state) {
    throw new HttpException(200, "There is no data.");
  }

  let temp = [];

  result.bet.map((item) => {
    const now = new Date();

    const time = new Date(item.timeStamp.toString());
    const seconds = now.getTime() - time.getTime();
    temp.push({
      betAddress: item.betAddress,
      betAmount: (item.betAmount / 10 ** 18).toFixed(0).toString(),
      type: item.betType == 0 ? "matic" : "mmf",
      win: item.betWonOrLoose == 1,
      time: (seconds / 1000).toFixed(0).toString(),
    });
  });

  res.send({
    type: "success",
    result: temp,
  });
};

const addBet = async (req, res, next) => {
  console.log("req", req.body);
  const validater = await BetModel.checkDuplicate({
    requestId: req.body.requestId,
  });
  if (validater) {
    return res.send({
      type: "fail",
      message: "duplicated",
    });
  } else {
    const checkStreaks = await StreaksModel.checkStreaks({
      betAddress: req.body.betAddress,
    });
    if (checkStreaks == 1 && req.body.betWonOrLoose == true) {
      const result = await StreaksModel.checkAddOrUpdate({
        betAddress: req.body.betAddress,
      });
      if (result == 1) {
        // Add
        await StreaksModel.addStreaks({
          betAddress: req.body.betAddress,
          betType: req.body.betType,
          betAmount: req.body.betAmount,
          requestId: req.body.requestId,
        });
      } else {
        await StreaksModel.updateStreaks({
          betAddress: req.body.betAddress,
        });
      }
    } else {
      await StreaksModel.disableStreaks({
        betAddress: req.body.betAddress,
      });
    }

    const result = await BetModel.addBet({
      betAddress: req.body.betAddress,
      betType: req.body.betType,
      betAmount: req.body.betAmount,
      betWonOrLoose: req.body.betWonOrLoose,
      betSide: req.body.betSide,
      requestId: req.body.requestId,
    });

    if (result.affectedRows === 0) {
      throw new HttpException(400, "The addBet has been failed.");
    }

    const statics = await StaticsModel.getStatics();

    let params;
    if (req.body.betSide == 0 && req.body.betWonOrLoose == 1) {
      params = {
        headsWin: statics.result[0].headsWin + 1,
        tailsWin: statics.result[0].tailsWin,
      };
    } else if (req.body.betSide == 0 && req.body.betWonOrLoose == 0) {
      params = {
        headsWin: statics.result[0].headsWin,
        tailsWin: statics.result[0].tailsWin + 1,
      };
    } else if (req.body.betSide == 1 && req.body.betWonOrLoose == 1) {
      params = {
        headsWin: statics.result[0].headsWin,
        tailsWin: statics.result[0].tailsWin + 1,
      };
    } else if (req.body.betSide == 1 && req.body.betWonOrLoose == 0) {
      params = {
        headsWin: statics.result[0].headsWin + 1,
        tailsWin: statics.result[0].tailsWin,
      };
    }

    const upRes = await StaticsModel.updateWinningStatics(params);

    if (!upRes) {
      throw new HttpException(400, "Updating statics has been failed.");
    }

    res.send({
      type: "success",
      message: "successfull",
      test: statics,
    });
  }
};

const getStatsBetData = async (req, res, next) => {
  const won = await BetModel.getStatsWon({ betAddress: req.body.betAddress });
  const lose = await BetModel.getStatsLose({ betAddress: req.body.betAddress });
  const maticWon = await BetModel.getStatsMaticWon({
    betAddress: req.body.betAddress,
  });
  const mmfWon = await BetModel.getStatsMMFWon({
    betAddress: req.body.betAddress,
  });

  if (!won.state || !lose.state) {
    throw new HttpException(200, "There is no data.");
  }

  res.send({
    type: "success",
    message: "success",
    result: {
      won: won.result,
      lose: lose.result,
      maticWon: maticWon.result,
      mmfWon: mmfWon.result,
    },
  });
};

const getVolumeData = async (req, res, next) => {
  const maticWon = await BetModel.getTotalStatsMaticWon();
  const mmfWon = await BetModel.getTotalStatsMMFWon();
  res.send({
    type: "success",
    message: "success",
    result: {
      maticWon: maticWon.result,
      mmfWon: mmfWon.result,
    },
  });
};

const checkDuplicate = async (req, res, next) => {
  const validater = await BetModel.checkDuplicate({
    requestId: req.body.requestId,
  });
  res.send({
    type: "success",
    message: "success",
    result: validater,
  });
};

/***********************************Export*******************************************/
module.exports = {
  getBetData,
  addBet,
  getRecentBetData,
  getStatsBetData,
  getVolumeData,
  checkDuplicate,
};
