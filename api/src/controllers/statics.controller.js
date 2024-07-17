const HttpException = require("../utils/HttpException.utils");
const StaticsModel = require("../models/staticswin.model");

/*********************************Property Controller*********************************************/

const getStatics = async (req, res, next) => {
  const result = await StaticsModel.getStatics();
  if (!result.state) {
    throw new HttpException(200, "There is no data.");
  }

  res.send({
    type: "success",
    message: "success",
    result: result.result,
  });
};

/***********************************Export*******************************************/
module.exports = {
  getStatics,
};
