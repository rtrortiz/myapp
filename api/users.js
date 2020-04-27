const express = require('express');
const router = express.Router();

// you don't use app.get instead use router.get //
// @route GET api/users
// @desc Test route
// @access Public - this route does not need a token/auth for
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
