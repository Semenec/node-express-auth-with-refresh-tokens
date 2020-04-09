const { createToken, verifyToken } = require('../helpers/tokens');
const User = require('../models/User');
const Token = require('../models/Token');

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);

    req.user = user.dataValues;
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: req.body });

    if (user) {
      req.user = user.dataValues;
      next();
    } else {
      res.status(400).json({ error: 'ID or password is not valid' });
    }
  } catch (e) {
    next(e);
  }
};

const refreshUserToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { userId, id } = await verifyToken(token);
    const userToken = await Token.findOne({ where: { data: token, userId } });

    if (userToken) {
      const authToken = createToken({ body: { id, userId, role: 'authToken' }, exp: '10m' });

      res.status(200).json({
        token: authToken,
        exp: await verifyToken(authToken).exp,
      });
    } else {
      res.status(401).json({
        error: 'Token is not active',
      });
    }
  } catch (e) {
    next(e);
  }
};

const createTokens = async (req, res, next) => {
  try {
    const { id, userId } = req.user;
    const refreshToken = createToken({ body: { id, userId, role: 'refreshToken' }, exp: 10000 });
    const accessToken = createToken({ body: { id, userId, role: 'authToken' }, exp: '10m' });
    const token = await Token.findOne({ where: { userId } });

    if (token) {
      await Token.update({ data: refreshToken }, { where: { userId } });
    } else {
      await Token.create({ data: accessToken, userId });
    }

    res.status(200).json({
      accessToken,
      refreshToken,
      exp: await verifyToken(accessToken).exp,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signUp,
  signIn,
  refreshUserToken,
  createTokens,
};
