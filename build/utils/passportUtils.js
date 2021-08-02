const config = require('../config');
const bCrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

const issueJWT = (user) => {
    const _id = user._id;

    const payload = {
        sub: _id,
        iat: Date.now()
    }
    const signedToken = jsonwebtoken.sign(payload, config.JWT_SECRET_KEY, { expiresIn: config.TOKEN_KEEP_ALIVE});

    return signedToken;
}

module.exports = {createHash, issueJWT, isValidPassword}