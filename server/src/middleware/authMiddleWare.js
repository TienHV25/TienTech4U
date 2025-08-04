const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleWare = (options = {}) => (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers.token;
  const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user; 

 
    if (options.requireAdmin && !user.isAdmin) {
      return res.status(401).json({ message: 'Must be admin to access' });
    }

   
    if (options.requireOwner) {
      const paramID = req.params.id
      const bodyUserID = req.body.id
      const userID = user.id

      const isOwner = userID === paramID || userID === bodyUserID;

      if (!isOwner) {
        return res.status(403).json({ message: 'Access denied: Not the owner' });
      }
    }

    next();
  });
};

module.exports = {
  authMiddleWare,
};
