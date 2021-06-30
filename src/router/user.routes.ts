import express from 'express';
const passport = require('passport');
//import { AuthController } from "../controller/auth.controller";

const userRouter = express.Router();

class UserRouter {
    /*public AuthController: AuthController;

    constructor(){
        this.AuthController = new AuthController()
    }*/

    start(){
        userRouter.get('/test',  passport.authenticate('jwt', { session: false }),  (req, res)=> {
            const user = req.user;
            res.json({message: `Congratulations= you made it to the protected route!`});
        });

        return userRouter;
    }

}

export default UserRouter;