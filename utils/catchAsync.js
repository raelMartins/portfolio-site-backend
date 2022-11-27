// const connectDB = require('./connectDB');

module.exports = fn => {
  // connectDB();
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
