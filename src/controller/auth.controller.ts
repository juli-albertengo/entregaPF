import mongoDBConnection from '../services/mongoDBConnection';
import { Request, Response } from 'express';
const userModel = require('../models/model/user.model');
import { User } from '../models/model/user.model'
const { createHash, issueJWT, isValidPassword } = require('../utils/passportUtils');
const { sendRegistrationEmail } = require('../utils/nodemailerUtils');
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();
const {loggerConsole} = require('../services/logger');
const consoleLog = loggerConsole.GetLogger();


export class AuthController{
  public connection: any;

    constructor() {
    }

    async signup(req: Request, res: Response){
        const username = req.body.username;
        const password = req.body.password; 
        try {
          await mongoDBConnection.Get()
          userModel.findOne({'username': username}, function(err: any, user: User){
            if(err){
              errorLog.error('Error in signup: ' + err);
              res.json({error: `There has been an error in signup => ${err}`})
            }
            if(user){
              consoleLog.warn('User already exists');
              res.json({error: `User already exists => ${user}`})
            } else {
              var newUser = new userModel();
              newUser.firstName = req.body.firstName;
              newUser.lastName = req.body.lastName;
              newUser.email = req.body.email;
              newUser.username = username;
              if( password) {
                newUser.password = createHash(password);
                try {
                  newUser.save(function(err: any, user: User){
                    if(err){
                      errorLog.error(`Error saving user: => ${err}`)
                      res.json({error: `There has been an error saving new user in DB => ${err}`})
                    }
                      consoleLog.info('User registration completed successfully');
                      sendRegistrationEmail(user.firstName);
                      const jwToken = issueJWT(user);
                      res.json({user, token: jwToken});
                    })
                  } catch (error) {
                    res.json({error: `There has been an error saving new user in DB => ${error}`});
                  }
              } else {
                res.json({error: `You need to privide a password`});
              }
            }
          })
        } catch (error){
          errorLog.error(error);
          res.json({error: `There has been an error in signup => ${error}`});
        }
    }

    async login(req: Request, res: Response){
        const username = req.body.username;
        const password = req.body.password;
        try {
            userModel.findOne({'username': username}, function(err: any, user: User){
            if(err){
                errorLog.error(`Error login: ${err}`)
                res.json({error: `There has been an error during login ${err}`})
            }
            if(!user){
                res.json({error: `User not found`})
            } else {
                const isValid = isValidPassword(user, password);
                if(isValid){
                const tokenObject = issueJWT(user);
                res.json({user, token: tokenObject})
                } else {
                res.json({error: `Wrong password!`})
                }
            }
            })
        } catch (error) {
            errorLog.error(error);
            res.json(`There has been an error during login => ${error}`)
        }
    }

    async logout(req: any, res: Response){
        req.logout();
        res.json({message: `Logout Successful`});
    }
}