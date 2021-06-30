const config = require('../config');
const {userModel} = require('../models/model/user.model');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const StrategyOptionsObject = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.PASSPORT_SECRET,
}

const jwtStrategy = new JWTstrategy(StrategyOptionsObject, function(payload, done){
    userModel.findOne({_id: payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

module.exports = {jwtStrategy};