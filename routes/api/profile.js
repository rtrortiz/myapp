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
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(location) profileFields.location = location;
    if(website) profileFields.website = website;
    if(bio) profileFields.bio= bio;
    if(status) profileFields.status= status;
    if(githubusername) profileFields.githubusername= githubusername;
    if(youtube) profileFields.youtube= youtube;
    if(twitter) profileFields.twitter= twitter;
    if(instagram) profileFields.instagram= instagram;
    if(linkedin) profileFields.linkedin= linkedin;
    if(facebook) profileFields.facebook= facebook;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    
    // Build social object
    profileFields.social = {}
    if(company) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin= linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    
    try{
        let profile = Profile.findOne({ user: req.user.id});
        
        if(profile){
            //Update
            
        }
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
    //console.log(profileFields.skills);
    //res.send('Hello');
    
});

module.exports = router;
