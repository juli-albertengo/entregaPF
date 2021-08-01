import express from 'express';
import { ImagesController } from "../controller/images.controller";
const passport = require('passport');
const upload = require('../middleware/uploadImagesMiddleware');
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

const imagesRouter = express.Router();

//Helper middleware function to check if user is admin or not
const checkAdmin = async(req: any, res:any, next: any) =>{
    const user = req.user;
    try{
        if(user.admin === false){
            res.status(401);
            res.json({error: `You must be an admin user to use this route`})
        } else {
            next()
        }
    } catch(error){
        errorLog.error(error);
        res.status(500);
        res.json({error: "There has been an error saving the image"});
    }
}

class ImagesRouter {
    public imagesController: ImagesController;

    constructor(){
        this.imagesController = new ImagesController();
    }

    start(){
        imagesRouter.get('/:id', this.imagesController.getImageById);
        
        imagesRouter.post('/upload', 
            passport.authenticate('jwt', {session: false}), 
            checkAdmin,
            upload.single('file'),
            this.imagesController.uploadImage
        );
        
        imagesRouter.delete('/:id', passport.authenticate('jwt', {session: false}), checkAdmin, this.imagesController.deleteImage);
        
        imagesRouter.get('/*', (req, res) => {
            res.status(400);
            res.json({message: `Please request a valid url`
        })})

        return imagesRouter;
    }

}

export default ImagesRouter;
