const config = require('../config.js');
import {Request, Response} from 'express';
import {ApiImages} from '../api/api.images';
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

export class ImagesController {
    public apiImages: ApiImages;

    constructor() {
        this.apiImages = new ApiImages()
    }

    getImageById = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            let stream = await this.apiImages.getImageById(id);
            res.status(200);
            stream.pipe(res);
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error fetching the image."});
        }
    }

    uploadImage = async (req: Request, res: Response) => {
        try {
            if(req.file === undefined){
                res.json({error: "You must select a file"})
            } else {
                console.log(req.file);
                const imgUrl = `http://localhost:${config.PORT}/api/images/${req.file.filename}`
                res.status(200)
                res.send(imgUrl);
            }
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error saving the order"})
        }
    }

    deleteImage = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            let deletedImage = await this.apiImages.deleteImage(id);
            res.json(deletedImage);
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error deleting the image."})
        }
    }

}