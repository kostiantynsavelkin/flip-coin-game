const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
const { multipleColumnSet } = require("../utils/common.utils");

/***********************************User Model***************************************/
const getBetAll = async (params) => {
  const sql = `SELECT * FROM ${Tables.TB_bet}`;
  const result = await DBConnection.query(sql, []);
  if (result.length === 0) {
    return {
      state: false,
      bet: [],
    };
  }
  return {
    state: true,
    bet: result,
  };
};

const getRecentBet = async (params) => {
  const sql = `SELECT * FROM ${Tables.TB_bet} order by no desc limit 5`;

  const result = await DBConnection.query(sql, []);
  if (result.length === 0) {
    return {
      state: false,
      bet: [],
    };
  }
  return {
    state: true,
    bet: result,
  };
};

const addBet = async (params) => {
  const sql = `INSERT INTO ${Tables.TB_bet} 
                    (betAddress, betType, betAmount, betWonOrLoose, betSide, requestId) VALUES (?,?,?,?,?,?)`;

  const result = await DBConnection.query(sql, [
    params.betAddress,
    parseInt(params.betType),
    params.betAmount,
    params.betWonOrLoose == true ? 1 : 0,
    parseInt(params.betSide),
    params.requestId,
  ]);

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const checkDuplicate = async (params) => {
  const sql = `SELECT COUNT(*) FROM ${Tables.TB_bet} WHERE requestId = ?`;
  const result = await DBConnection.query(sql, [params.requestId]);
  if (result[0]["COUNT(*)"] === 0) {
    return false;
  }
  return true;
};

const getStatsWon = async (params) => {
  const sql = `SELECT SUM(betWonOrLoose) FROM ${Tables.TB_bet} WHERE betAddress = ?`;
  const result = await DBConnection.query(sql, [params.betAddress]);
  if (result.length === 0) {
    return {
      state: false,
      result: result[0]["SUM(betWonOrLoose)"],
    };
  }
  return {
    state: true,
    result: result[0]["SUM(betWonOrLoose)"],
  };
};

const getStatsLose = async (params) => {
  const sql = `SELECT COUNT(*) FROM ${Tables.TB_bet} WHERE betWonOrLoose = 0 and betAddress = ?`;

  const result = await DBConnection.query(sql, [params.betAddress]);
  if (result.length === 0) {
    return {
      state: false,
      result: result[0]["COUNT(*)"],
    };
  }
  return {
    state: true,
    result: result[0]["COUNT(*)"],
  };
};

const getStatsMaticWon = async (params) => {
  let sql = `SELECT Sum(betAmount) AS Amount FROM ${Tables.TB_bet} WHERE betType = 0 AND betAddress = ? AND betWonOrLoose = 1 GROUP BY betAddress`;

  let result = await DBConnection.query(sql, [params.betAddress]);
  let earned = 0;
  let lose = 0;
  if (result.length !== 0) {
    earned = result[0]["Amount"];
  }

  sql = `SELECT Sum(betAmount) AS Amount FROM ${Tables.TB_bet} WHERE betType = 0 AND betAddress = ? AND betWonOrLoose = 0 GROUP BY betAddress`;

  result = await DBConnection.query(sql, [params.betAddress]);

  if (result.length !== 0) {
    lose = result[0]["Amount"];
  }

  return {
    state: true,
    result: earned - lose,
  };
};

const getStatsMMFWon = async (params) => {
  let sql = `SELECT Sum(betAmount) AS Amount FROM ${Tables.TB_bet} WHERE betType = 1 AND betAddress = ? AND betWonOrLoose = 1 GROUP BY betAddress`;

  let result = await DBConnection.query(sql, [params.betAddress]);
  let earned = 0;
  let lose = 0;
  if (result.length !== 0) {
    earned = result[0]["Amount"];
  }

  sql = `SELECT Sum(betAmount) AS Amount FROM ${Tables.TB_bet} WHERE betType = 1 AND betAddress = ? AND betWonOrLoose = 0 GROUP BY betAddress`;

  result = await DBConnection.query(sql, [params.betAddress]);

  if (result.length !== 0) {
    lose = result[0]["Amount"];
  }

  return {
    state: true,
    result: earned - lose,
  };
};

const getTotalStatsMaticWon = async () => {
  let sql = `SELECT Sum(betAmount) AS Amount FROM ${Tables.TB_bet} WHERE betType = 0`;

  let result = await DBConnection.query(sql, []);
  let earned = 0;
  if (result.length !== 0) {
    earned = result[0]["Amount"];
  }

  return {
    state: true,
    result: earned,
  };
};

const getTotalStatsMMFWon = async () => {
  let sql = `SELECT Sum(betAmount) AS Amount FROM ${Tables.TB_bet} WHERE betType = 1`;
  let result = await DBConnection.query(sql, []);
  let earned = 0;
  let lose = 0;
  if (result.length !== 0) {
    earned = result[0]["Amount"];
  }

  return {
    state: true,
    result: earned,
  };
};

const getLeaderboardData = async (params) => {
  const sql = `SELECT betAddress,Sum(betWonOrLoose) AS Wins,Sum(betAmount) AS Amount FROM ${Tables.TB_bet} WHERE timestamp BETWEEN ? AND ? AND betType = ? GROUP BY betAddress order by Sum(betAmount) desc`;
  const result = await DBConnection.query(sql, [
    params.fromDate,
    params.toDate,
    params.betType,
  ]);

  let data = [];

  result.map((item) => {
    if (item.Wins != 0) {
      data.push(item);
    }
  });

  if (result.length === 0) {
    return {
      state: false,
      result: data,
    };
  }
  return {
    state: true,
    result: data,
  };
};

/***********************************Export*******************************************/
module.exports = {
  getBetAll,
  addBet,
  getRecentBet,
  getStatsWon,
  getStatsLose,
  getStatsMaticWon,
  getStatsMMFWon,
  getLeaderboardData,
  checkDuplicate,
  getTotalStatsMaticWon,
  getTotalStatsMMFWon,
};
