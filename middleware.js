let jwt = require('jsonwebtoken');
const config = require("./config.js");

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({message:"Invalid token"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({message:"Missing token"});
    }
};

module.exports = {
    checkToken: checkToken
}