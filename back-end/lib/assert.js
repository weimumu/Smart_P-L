module.exports = (exp, message) => {
  if (!exp) {
    const err = new Error(message);
    err.status = 400;
    throw err;
  }
};
