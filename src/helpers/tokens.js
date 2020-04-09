const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;


const createToken = ({ body, exp }) => jwt.sign(body, JWT_SECRET_KEY, { expiresIn: exp });
const verifyToken = (token) => jwt.verify(token, JWT_SECRET_KEY);

module.exports = {
  createToken,
  verifyToken,
};
