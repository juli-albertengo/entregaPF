const express = require('express');
const passport = require('passport');

const userRouter = express.Router();

class UserRouter {

    constructor(){
    }

    start(){
        userRouter.get('/',  passport.authenticate('jwt', { session: false }),  (req: any, res: any)=> {
            const user = req.user;
            res.json({message: `Congratulations ${user.firstName} you made it to the protected route!`});
        userRouter.get('/*', (req: any, res: any) => res.json({message: `Please request a valid url`}))
        });

        return userRouter;
    }

}

export default UserRouter;