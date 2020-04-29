const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

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
        
});

////////////////////////////////////////////////////////////////////////////

// @route POST api/auth
// @desc Authenicate user & get token
// @access Public 
router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
    //console.log(req.body);//'req.body' allows you get data from db
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
       }
    
    const { email, password} = req.body;
    
    try {
        
// See if user exists
    let user = await User.findOne({ email });
    
        if (!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}] });
        }
    
    
// Return jsonwebtoken-inorder for a user to stay logged in they will their webtoken
    
const payload = {
    user: {
        id: user.id
    }
}
       
// Verify plain text password that the user entered with encrypted password that sent to us by the db query
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}] });
        }
    


jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600}, 
    (err, token) => {
    if(err) throw err;
    res.json({token});
    
    
}); 
        
///////
        
    } catch(err) {
        
        console.error(err.message);
        res.status(500).send('Server error');
}
       
            
});

     
module.exports = router;
