const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      res.status(500).json({ "Error encountered": e });
    }
  };
};

module.exports = asyncWrapper;
