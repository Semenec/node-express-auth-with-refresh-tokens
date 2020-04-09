const express = require('express');
const { getUserProfile, logout } = require('../constrollers/user');

const router = express.Router();

router.get('/info', getUserProfile);
router.get('/logout', logout);

module.exports = router;
