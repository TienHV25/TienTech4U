const jwt = require('jsonwebtoken')

const generalAccessToken = (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN,{expiresIn: '30s'})
    return accessToken
}

const generalRefreshToken = (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN,{expiresIn: '365d'})
    return accessToken
}

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
};


module.exports =  {generalAccessToken,generalRefreshToken,verifyToken}