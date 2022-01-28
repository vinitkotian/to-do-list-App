const notFoundError = (req, res, next) => {
  res
    .status(404)
    .json({ status: "Fail", msg: "Requested resource does not exist." });
};

module.exports = notFoundError;
