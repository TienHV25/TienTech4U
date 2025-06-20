const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleWare = (options = {}) => (req,res,next) => {
    const authHeader =  req.headers['authorization'] || req.headers.token 
    const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : null
    const userID = req.params.id

    if (!token) {
        return res.status(403).json({ message: 'Token is required' })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' })
        }
        const payload = user
        const checkUserID = (userID === payload.id)
        if(options.requireAdmin) {
            if(payload.isAdmin) {
                return next()
            } else {
                return res.status(401).json({ message: 'The Authentication must be Admin to access' })
            }
        }
        else {
            if(payload.isAdmin  || checkUserID) {
                return next()
            } else {
                return res.status(401).json({ message: 'The Authentication must be Admin or the owner of this account to access' })
            }
        }
    })
}

module.exports =  {
    authMiddleWare
}
