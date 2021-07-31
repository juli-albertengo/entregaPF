import mongoDBConnection from '../services/mongoDBConnection';
import { Request, Response } from 'express';
import { User } from '../models/model/user.model';
import userModel from '../models/model/user.model';
import {validate} from 'class-validator'
const { createHash, issueJWT, isValidPassword } = require('../utils/passportUtils');
import {ApiCarts} from '../api/api.carts';
import {Cart, DeliveryAddress} from '../models/model/carts.model';
const { sendRegistrationEmail } = require('../utils/nodemailerUtils');
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();
const {loggerConsole} = require('../services/logger');
const consoleLog = loggerConsole.GetLogger();

const apiCarts = new ApiCarts();

export class AuthController{
  public connection: any;

    constructor() {
    }

    /*
      SIGNUP FUNCTION EXPLAINED
      STEP 1
        A. Grab the data from the body and validate it by creating a New User & New DeliveryAddress
        B. Check that the passwords match
        C. Check the database for repeated usernames
      STEP 2. Create the USER in the database
      STEP 3. Once registration completed successfully => Send Registration Email & Issue JWT
      STEP 4. Create and validate Cart.
    */

    async signup(req: Request, res: Response){
      try{
        // STEP 1A. Validate data from Body 
        const {username, password, duplicatedPassword, admin, fullName, phone, email, deliveryAddress} = req.body
        
        const deliveryAddressToValidate = new DeliveryAddress(deliveryAddress.street, deliveryAddress.streetNumber, deliveryAddress.postalCode, deliveryAddress.floor, deliveryAddress.appartament);
        const resultValidationDeliveryA = await validate(deliveryAddressToValidate);
        
        const userToValidate = new User(fullName, phone, email, admin, username, password, duplicatedPassword);
        const resultValidationUser = await validate(userToValidate);
        
        if(resultValidationDeliveryA.length > 0){
          errorLog.error(resultValidationDeliveryA);
          res.status(400);
          res.json({error: `Validation Error => You must provide the data required: ${resultValidationDeliveryA}`})
        } else if(resultValidationUser.length > 0) {
          errorLog.error(resultValidationUser);
          res.status(400);
          res.json({error: `Validation Error => You must provide the data required: ${resultValidationUser}`})
        } else {
            //STEP 1B. Validate the passwords
            if(userToValidate.password !== userToValidate.duplicatedPassword){
              res.status(400);
              res.json({error: `Validation Error => Your passwords don't match`})
            } else {
              await mongoDBConnection.Get();

              //STEP 1C. Check database from repeated usernames
              userModel.findOne({'username': username}, function(err: any, user: User){
                if(err){
                  errorLog.error('Error in signup: ' + err);
                  res.status(500)
                  res.json({error: `There has been an error checking for existing username => ${err}`})
                }
                if(user){
                  consoleLog.warn('User already exists');
                  res.json({error: `Username already taken => ${user.username}`})
                } else {

                  //STEP 2. Create User in Database
                  var newUser = new userModel();
                  newUser.fullName = fullName;
                  newUser.phone = phone;
                  newUser.email = email;
                  newUser.admin = admin || false;
                  newUser.username = username;
                  newUser.password = createHash(password);
                  try {
                    newUser.save(async function(err: any, user: any){
                      if(err){
                        errorLog.error(`Error saving user: => ${err}`)
                        res.status(500);
                        res.json({error: `There has been an error saving new user in DB => ${err}`})
                      } else {
                          consoleLog.info('User registration completed successfully');

                          //STEP 3. Send Registration Email & Issue JWT
                          sendRegistrationEmail(user.fullName);
                          const jwToken = issueJWT(user);

                          //STEP 4. Create and validate Cart
                          const timestamp = new Date(Date.now()).toDateString();
                          const cartToValidate = new Cart(user._id, timestamp, deliveryAddress, [])
                          const resultValidationCart = await validate(cartToValidate);
                          if(resultValidationCart.length > 0){
                            errorLog.error(resultValidationCart);
                            res.status(500);
                            res.json({error: `Validation Error => The cart couldn't be validated: ${resultValidationCart}`})
                          } else {    
                            const createdCart = await apiCarts.createCart(cartToValidate);
                            if(Object.keys(createdCart).length == 0){
                              res.status(500);
                              res.json(`There has been an error creating the cart`)
                            } else {
                                res.status(201);
                                res.json({user, token: jwToken, userCart: createdCart});
                            }
                          }
                        }
                    })
                  } catch (error) {
                    res.status(500);
                    res.json({error: `There has been an error saving new user in DB => ${error}`});
                  }
                }
              })
             }
           }
        } catch (error){
          errorLog.error(error);
          res.status(500);
          res.json({error: `There has been an error in signup => ${error}`});
        }
    }

    async login(req: Request, res: Response){
        const username = req.body.username;
        const password = req.body.password;
        try {
            await mongoDBConnection.Get();
            userModel.findOne({'username': username}, function(err: any, user: User){
            if(err){
                errorLog.error(`Error login: ${err}`)
                res.status(500);
                res.json({error: `There has been an error during login ${err}`})
            } else if(!user){
                res.status(401)
                res.json({error: `User not found by username: ${username}`})
            } else {
                const isValid = isValidPassword(user, password);
                if(isValid){
                const tokenObject = issueJWT(user);
                res.status(200);
                res.json({user, token: tokenObject})
                } else {
                  res.status(401);
                  res.json({error: `Wrong password!`})
                }
            }
            })
        } catch (error) {
            errorLog.error(error);
            res.status(500);
            res.json(`There has been an error during login => ${error}`)
        }
    }
}