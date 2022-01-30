const sendNotFoundError = (req, res, next) => {
  return res
    .status(404)
    .json({ status: "Fail", msg: "Requested resource does not exist." });
};
module.exports = sendNotFoundError;
