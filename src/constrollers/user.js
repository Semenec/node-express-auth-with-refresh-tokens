const User = require('../models/User');
const Token = require('../models/Token');

const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ where: { userId }, attributes: ['id', 'userId'] });

    res.send(user);
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { userId } = req.user;

    await Token.destroy({ where: { userId } });

    res.send('ok');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUserProfile,
  logout,
};
