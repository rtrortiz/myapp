const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
// Get User model
const User = require('../../models/Users');
// @route POST api/users
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
],
    async (req, res) => {
    //console.log(req.body);//'req.body' allows you get data from db
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
       }
    
    const { name, email, password} = req.body;
    
    try {
        
    // See if user exists
    let user = await User.findOne({ email });
    
        if (user){
            return res.status(400).json({ errors: [{ msg: 'User already exits'}] });
        }
    
    // Get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    
    user = new User({
        name,
        email,
        avatar,
        password
    });
    
    // Encrypt password-using bcyrpt
    
const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);
        
await user.save();
    
// Return jsonwebtoken-inorder a user to stay logged in they will their webtoken
    
//////////////////////////
   // res.send('User route');
    res.send('User registered');
        
    } catch(err) {
        
        console.error(err.message);
        res.status(500).send('Server error');
}
    
    
    
    
    
    
    
    
    
    
    
            
});

module.exports = router;
