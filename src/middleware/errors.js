const error = (err, req, res) => {
  console.log({ err, req });
  res.status(500).json({ error: err });
};

module.exports = {
  error,
};
