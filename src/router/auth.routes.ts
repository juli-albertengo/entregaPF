import express from 'express';
import { AuthController } from "../controller/auth.controller";

const authRouter = express.Router();

class AuthRouter {
    public AuthController: AuthController;

    constructor(){
        this.AuthController = new AuthController()
    }

    start(){
        authRouter.post('/singup',  this.AuthController.signup);
        authRouter.post('/login', this.AuthController.login);
        authRouter.get('/logout', this.AuthController.logout);
        authRouter.get('/*', (req, res) => {res.json({message: `There's nothing to see here`})});
    
        return authRouter;
    }

}

export default AuthRouter;