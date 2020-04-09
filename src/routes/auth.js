const express = require('express');
const {
  signUp, signIn, refreshUserToken, createTokens,
} = require('../constrollers/auth');

const router = express.Router();

router.post('/signin', [signIn, createTokens]);
router.post('/signin/new_token', refreshUserToken);
router.post('/signup', [signUp, createTokens]);


module.exports = router;
