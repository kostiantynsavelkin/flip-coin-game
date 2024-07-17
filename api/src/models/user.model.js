const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
const { multipleColumnSet } = require("../utils/common.utils");

/***********************************User Model***************************************/
const updateProfile = async (params) => {
  const sql = `UPDATE ${Tables.TB_user} SET full_name = ?, nick_name = ?, country = ?, walletAddress = ?, twoFAEmail = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [
    params.fullName,
    params.nickName,
    params.country,
    params.walletAddress,
    params.twoFAEmail,
    params.email,
  ]);

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const updateWalletInfo = async (params) => {
  const sql = `UPDATE ${Tables.TB_user} SET innerwalletaddress  = ?, innerprivatekey = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [
    params.innerwalletaddress,
    params.innerprivatekey,
    params.email,
  ]);

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const userPasswordChange = async (params) => {
  const sql = `UPDATE ${Tables.TB_user} SET password  = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [
    params.newPassword,
    params.email,
  ]);
  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const create = async ({
  fullName,
  nickName,
  email,
  password,
  role,
  address,
  privatekey,
}) => {
  const sql = `INSERT INTO ${Tables.TB_user} 
                    (full_name, nick_name, email, password, role, isVerified, code) VALUES (?,?,?,?,?,?,?)`;
  const result = await DBConnection.query(sql, [
    fullName,
    nickName,
    email,
    password,
    role,
    0,
    "",
  ]);
  const affectedRows = result ? result.affectedRows : 0;
  return affectedRows;
};

const getUserByRole = async (params) => {
  const sql = `SELECT * FROM ${Tables.TB_user} WHERE role = ?`;
  const result = await DBConnection.query(sql, [params.role]);
  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }
  return {
    state: true,
    user: result,
  };
};

const isEmptyUser = async (params) => {
  const { columnSet, values } = multipleColumnSet(params);
  const sql = `SELECT * FROM ${Tables.TB_user} WHERE ${columnSet}`;
  const result = await DBConnection.query(sql, [...values]);

  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }

  return {
    state: true,
    user: result[0],
  };
};

const getAllAdmin = async () => {
  const sql = `SELECT * FROM ${Tables.TB_user} WHERE role = ?`;
  const result = await DBConnection.query(sql, [0]);
  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }
  return {
    state: true,
    user: result,
  };
};

const getAllWallet = async () => {
  const sql = `SELECT DISTINCT walletAddress FROM user WHERE walletAddress <> ''`;
  const result = await DBConnection.query(sql);
  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }
  return {
    state: true,
    user: result,
  };
};

const getAllUserExceptAdmin = async () => {
  const sql = `SELECT * FROM ${Tables.TB_user} WHERE role != ?`;
  const result = await DBConnection.query(sql, [0]);
  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }
  return {
    state: true,
    user: result,
  };
};

const isEmptyUserByEmail = async (email) => {
  const sql = `SELECT * FROM ${Tables.TB_user} WHERE email = ?`;
  const result = await DBConnection.query(sql, [email]);
  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }
  return {
    state: true,
    user: result[0],
  };
};

const verification = async (params) => {
  const sql = `UPDATE ${Tables.TB_user} SET code = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [params.code, params.email]);
  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const setVerifiedEmail = async (params) => {
  const sql = `UPDATE ${Tables.TB_user} SET isVerified = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [1, params.email]);
  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const isVerify = async (params) => {
  const sql = `SELECT code FROM ${Tables.TB_user}
        WHERE email = ?`;
  const result = await DBConnection.query(sql, [params.email]);
  if (result[0].code === params.verifyCode) {
    return true;
  } else {
    return false;
  }
};

const resetpassword = async (params) => {
  const sql = `UPDATE ${Tables.TB_user} SET password = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [params.password, params.email]);
  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const getUserHistory = async (params) => {
  const sql = `SELECT * FROM history t1 INNER JOIN user t2 ON (t1.user_id = t2.id) WHERE t1.user_id = ?`;
  const result = await DBConnection.query(sql, [params.user_id]);

  if (result.length === 0) {
    return {
      state: false,
      history: [],
    };
  }

  return {
    state: true,
    history: result,
  };
};

const getAllUserHistory = async (params) => {
  const sql = `SELECT * FROM history`;
  const result = await DBConnection.query(sql);

  if (result.length === 0) {
    return {
      state: false,
      histories: [],
    };
  }

  return {
    state: true,
    histories: result,
  };
};

/***********************************Export*******************************************/
module.exports = {
  updateProfile,
  userPasswordChange,
  create,
  isEmptyUser,
  verification,
  isVerify,
  setVerifiedEmail,
  resetpassword,
  isEmptyUserByEmail,
  getUserByRole,
  getAllAdmin,
  updateWalletInfo,
  getAllUserExceptAdmin,
  getUserHistory,
  getAllWallet,
  getAllUserHistory,
};
