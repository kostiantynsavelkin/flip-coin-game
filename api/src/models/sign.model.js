const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
const { multipleColumnSet } = require("../utils/common.utils");

/***********************************User Model***************************************/

const getSignData = async (params) => {
  const sql = `SELECT * FROM ${Tables.TB_sign} WHERE betAddress = ?`;
  const result = await DBConnection.query(sql, [params.betAddress]);

  if (result.length === 0) {
    return false;
  } else {
    return true;
  }
};

const addSign = async (params) => {
  const sql = `INSERT INTO ${Tables.TB_sign} 
                    (signature, betAddress) VALUES (?,?)`;

  const result = await DBConnection.query(sql, [
    params.signature,
    params.betAddress,
  ]);

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

/***********************************Export*******************************************/
module.exports = {
  getSignData,
  addSign,
};
