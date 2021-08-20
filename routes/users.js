const express = require('express');
const router = express.Router();
const debugLog = require('debug')('users');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await req.db.user.find().lean().exec();
  debugLog('users found', users)
  res.json(users);
});

module.exports = router;
