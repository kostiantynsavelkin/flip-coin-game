var path = require("path");

const getAppDir = () => {
  var appDir = path.dirname(require.main.filename);
  return appDir;
};

const multipleColumnSet = (object) => {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  columnSet = keys.map((key) => `${key} = ?`).join(", ");

  return {
    columnSet,
    values,
  };
};

function makeRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const multipleParamSet = (object) => {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  columnSet = keys.map((key) => `${key}`).join(", ");

  return {
    keys,
    values,
  };
};
module.exports = {
  multipleColumnSet,
  multipleParamSet,
  getAppDir,
  makeRandomString
};
