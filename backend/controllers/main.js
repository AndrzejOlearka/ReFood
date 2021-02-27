
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    
    let { username, email, password, passwordConfirm, region} = req.body;

    try{
        
        if(
            !username ||
            !email ||
            !password ||
            !passwordConfirm || 
            !region
        )
            return res.status(400).json({msg: 'Not all fields have been filled.'})

        if(password !== passwordConfirm)
            return res.status(400).json({msg: 'Provided passwords do not match.'})

        if(password.length < 5)
            return res.status(400).json({msg: 'Password needs to be at least 5 characters long.'})

        if(username.length < 5)
            return res.status(400).json({msg: 'Username needs to be at least 5 characters long.'})

        const existingUsername = await User.findOne({username: username})
        if(existingUsername)
            return res.status(400).json({msg: 'An account with this username exists'})

        const existingEmail = await User.findOne({email: email})
        if(existingEmail)
            return res.status(400).json({msg: 'An account with this email exists'})
        
        const isEmailValid = await emailValidator(email);
        if(!isEmailValid)
            return res.status(400).json({msg: 'Email is not valid'})

        const hash = await encryptPassword(password);
        if(!hash)
            return res.status(400).json({msg: 'Cannot hash the password'})
        

        const newUser = new User({
            username, email, password: hash, region 
        })

        const addedUser = await newUser.save();
        res.json(addedUser);

    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }

}

exports.login = async (req, res) => {
    
    let { username, password} = req.body;

    try{
        if(!username)
            return res.status(400).json({msg: 'Username Field is empty.'})
        
        if(!password)
            return
            
        const verifiedUser = await User.findOne({username: username})
        if(!verifiedUser)
            return res.status(400).json({msg: 'There is no user with this email.'})

        const isMatch = await bcrypt.compare(password, verifiedUser.password)
        if(!isMatch)
            return res.status(400).json({msg: 'Invalid Password.'})

        const token = jwt.sign({id: verifiedUser._id}, process.env.JWT_SECRET_KEY)

        res.json({
            token, 
            user: {
                id: verifiedUser._id
            }
        });

    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }

}

exports.auth = async (req, res) => {
    
    try{
        const token = req.header("x-auth-token")
        if(!token)
            return res.json(false);
        
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!verified)
            return res.json(false);
      
        const user = await User.findById(verified.id)
        if(!user)
            return res.json(false);
        
        return res.json(true);
    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }

}

exports.userData = async (req, res) => {
    
    let userId = req.user

    try{

        const user = await User.findById(userId)
        let region = user.region.toLowerCase();
        console.log(region);
        res.json({
            username: user.username,
            email: user.email,
            region: region,
            id: user._id
        })

    } catch(err)
    {
        return res.status(500).json({error: err.message})
    }

}

async function encryptPassword(password)
{
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

async function emailValidator(email)
{
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email)
}