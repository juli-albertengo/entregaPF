import express from 'express';
import { ImagesController } from "../controller/images.controller";
const upload = require('../middleware/uploadImagesMiddleware.js');

const imagesRouter = express.Router();

class ImagesRouter {
    public imagesController: ImagesController;

    constructor(){
        this.imagesController = new ImagesController();
    }

    start(){
        imagesRouter.get('/:id', this.imagesController.getImageById);
        imagesRouter.post('/upload', upload.single('file'), this.imagesController.uploadImage);
        imagesRouter.delete('/:id', this.imagesController.deleteImage);
        imagesRouter.get('/*', (req, res) => {res.json({message: `Please request a valid url`})})

        return imagesRouter;
    }

}

export default ImagesRouter;