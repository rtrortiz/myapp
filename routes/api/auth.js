const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// you don't use app.get instead use router.get //
// @route GET api/auth
// @desc Test route
// @access Public - this route does not need a token/auth for
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
}
        
}
        
module.exports = router;
