const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.generateToken = (payload) => {
    return jwt.sign({ payload }, config.jwt_secret, { expiresIn: config.expiryTime.jwtToken });
}

module.exports.verify = (token, callback) => {
    jwt.verify(token, config.jwt_secret, (err, user) => {
        if (err) {
            callback({
                message: "Token is not valid",
              });
        }
        callback(user && user.payload);
    });
}