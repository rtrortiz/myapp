const express = require('express');
const router = express.Router();

// you don't use app.get instead use router.get //
// @route GET api/profile
// @desc Test route
// @access Public - this route does not need a token/auth for
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
