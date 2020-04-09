const express = require('express');
const authRouter = require('./auth');
const filesRouter = require('./files');
const userRouter = require('./user');
const { authenticate } = require('../middleware/auth');
const { error } = require('../middleware/errors');

const router = express.Router();

router.use(authRouter);
router.use(authenticate);
router.use(filesRouter);
router.use(userRouter);
router.use(error);

module.exports = router;
