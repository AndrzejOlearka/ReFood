const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if(!token)
        {
            return res.status(401).json({msg: "Invalid Authentication Token"})
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!verified)
            return res.status(401).json({msg: "Token Verification Failed"})
      
        req.user = verified.id
        next()
    } catch(err)
    {
        return res.status(500).json({err: err.message})
    }
}

module.exports = auth