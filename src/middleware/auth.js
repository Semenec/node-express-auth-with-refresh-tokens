const { verifyToken } = require('../helpers/tokens');
const Token = require('../models/Token');

const TOKEN_PREFIX = 'Bearer';

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next();
      res.status(401).json({ error: 'Not authorized' });
    }

    const authToken = authorization.substring(TOKEN_PREFIX.length + 1);
    const decodedToken = await verifyToken(authToken);
    const token = await Token.findOne({ where: { data: authToken, userId: decodedToken.userId } });

    if (token && decodedToken.role === 'authToken') {
      req.user = decodedToken;
      next();
    } else {
      res.status(401).json({ error: 'Token is not valid' });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  authenticate,
};
