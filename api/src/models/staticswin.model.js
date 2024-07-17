const Tables = require("../config/tables");
const DBConnection = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");

/***********************************User Model***************************************/
const getStatics = async (params) => {
  const sql = `SELECT * FROM ${Tables.TB_statics} WHERE no = 1`;
  const result = await DBConnection.query(sql, []);
  if (result.length === 0) {
    return {
      state: false,
      result: [],
    };
  }
  return {
    state: true,
    result: result,
  };
};

const updateWinningStatics = async (params) => {
  const sql = `UPDATE ${Tables.TB_statics} SET headsWin = ?, tailsWin = ? WHERE no = 1`;

  const result = await DBConnection.query(sql, [
    params.headsWin,
    params.tailsWin,
  ]);

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

/***********************************Export*******************************************/
module.exports = {
  getStatics,
  updateWinningStatics,
};
