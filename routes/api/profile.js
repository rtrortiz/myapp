const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
// @route GET api/profile/me
// @desc GET current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        
        res.json(profile);
        
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
    
});

// @route POST api/profile/me
// @desc Create or update user profile
// @access Private
router.post('/', [ auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
] ], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array()});
       }
    
     const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;
    
    // Build profile object
    const profileFields = {};
});

module.exports = router;
