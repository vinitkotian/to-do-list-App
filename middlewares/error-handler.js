const CustomApiError = require("../errors/custom-errors");
const handleErrorResponse = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ "Error Msg": err.message });
  } else {
    return res
      .status(500)
      .json({ Msg: "Internal server error,something went wrong!" });
  }
};

module.exports = handleErrorResponse;
