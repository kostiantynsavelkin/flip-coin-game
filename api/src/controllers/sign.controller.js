const HttpException = require("../utils/HttpException.utils");
const SignModel = require("../models/sign.model");

/*********************************Property Controller*********************************************/

const getSign = async (req, res, next) => {
  const signature = await SignModel.getSignData({
    betAddress: req.body.betAddress,
  });
  if (!signature) {
    res.send({
      type: "false",
      message: "err",
    });
  }

  res.send({
    type: "success",
    message: "success",
  });
};

const addSign = async (req, res, next) => {
  const result = await SignModel.addSign({
    betAddress: req.body.betAddress,
    signature: req.body.signature,
  });

  if (result.affectedRows === 0) {
    throw new HttpException(400, "The addBet has been failed.");
  }

  res.send({
    type: "success",
    message: "successfull",
  });
};

/***********************************Export*******************************************/
module.exports = {
  getSign,
  addSign,
};
