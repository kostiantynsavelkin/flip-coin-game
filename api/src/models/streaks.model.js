const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
const { multipleColumnSet } = require("../utils/common.utils");

/***********************************User Model***************************************/

const getStreaksData = async (params) => {
  const sql = `SELECT betAddress, streaks, timeStamp FROM ${Tables.TB_streaks} WHERE timestamp BETWEEN ? AND ? AND betType = ? order by timeStamp desc`;
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

const addStreaks = async (params) => {
  const sql = `INSERT INTO ${Tables.TB_streaks} 
                    (betAddress, betType, betAmount, streaks, requestId, enable) VALUES (?,?,?,2,?,1)`;

  const result = await DBConnection.query(sql, [
    params.betAddress,
    params.betType,
    params.betAmount,
    params.requestId,
  ]);

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const updateStreaks = async (params) => {
  const sql = `UPDATE ${Tables.TB_streaks} SET streaks = streaks + 1 WHERE enable = 1 and betAddress = ? order by no desc limit 1`;

  const result = await DBConnection.query(sql, [params.betAddress]);

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const disableStreaks = async (params) => {
  const sql = `UPDATE ${Tables.TB_streaks} SET enable = 0 WHERE enable = 1 and betAddress = ? order by no desc limit 1`;
  const result = await DBConnection.query(sql, [params.betAddress]);
  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const checkStreaks = async (params) => {
  const sql = `SELECT * FROM ${Tables.TB_bet} WHERE betAddress = ? order by no desc limit 1`;

  const result = await DBConnection.query(sql, [params.betAddress]);

  if (result.length > 0 && result[0].betWonOrLoose == 1) {
    return 1;
  } else {
    return 0;
  }
};

const checkAddOrUpdate = async (params) => {
  const sql = `SELECT * FROM ${Tables.TB_streaks} WHERE betAddress = ? order by no desc limit 1`;

  const result = await DBConnection.query(sql, [params.betAddress]);

  if (result.length > 0 && result[0].enable == 1) {
    // update
    return 0;
  } else {
    // add
    return 1;
  }
};

/***********************************Export*******************************************/
module.exports = {
  getStreaksData,
  addStreaks,
  updateStreaks,
  disableStreaks,
  checkStreaks,
  checkAddOrUpdate,
};
