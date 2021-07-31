const config = require('../config');
import mongoDBConnection from'../services/mongoDBConnection';
import userModel from '../models/model/user.model';
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

const StrategyOptionsObject = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET_KEY,
}

const jwtStrategy = new JWTstrategy(StrategyOptionsObject, async function (payload: any, done: any){
    try{
        await mongoDBConnection.Get()
        userModel.findOne({_id: payload.sub}, function(err: any, user: any) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    } catch (error){
        errorLog.error(error)
        return done(error, false);
    }
});

module.exports = jwtStrategy;