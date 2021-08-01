const config = require('../config.js');
import {Request, Response} from 'express';
import {ApiImages} from '../api/api.images';
import {ApiProducts} from '../api/api.products';
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

const apiProducts = new ApiProducts();

export class ImagesController {
    public apiImages: ApiImages;

    constructor() {
        this.apiImages = new ApiImages()
    }

    getImageById = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            let stream = await this.apiImages.getImageById(id);
            if(stream == `File not found`){
                res.status(404);
                res.json({error: `The imageId is not valid`})
            } else {
                res.status(200);
                stream.pipe(res);
            }
        }
        catch (error){
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error fetching the image."});
        }
    }

    uploadImage = async (req: any, res: Response, err: any) => {
        const {productId} = req.body
        try {
            //CASE 1: User didn't provide a file
            if(req.file === undefined){
                res.status(401);
                res.json({error: "You must select a file"})

            //CASE 2: User didn't provide valid productID
            } else if(req.file.bucketName == 'FILE-WITHOUT-PRODUCTID'){
                let deletedImage = await this.apiImages.deleteImageOfWrongProductId(req.file.id);
                if(Object.keys(deletedImage).length == 0){
                    res.status(401);
                    res.json({error: `You must provide a valid ProductId. Your file should be deleted => This action couldn't be performed`});
                } else {
                    res.status(401);
                    res.json({error: `You must provide a valid ProductId. Your file has been deleted`})
                }

            //CASE 3: User didn't provide valid filetype
            } else if(req.file.bucketName == 'FILETYPE-NOT-ALLOWED') {  
                let deletedImage = await this.apiImages.deleteFileOfWrongType(req.file.id);
                if(Object.keys(deletedImage).length == 0){
                    res.status(401);
                    res.json({error: `You must provide a valid file type. Your file should be deleted => This action couldn't be performed`});
                } else {
                    res.status(401);
                    res.json({error: `Your file was of the wrong type and has been deleted. The accepted types are: /jpeg|jpg|png/`})
                }
            } else {

                //Add fotoID in the product 
                const product = await apiProducts.getProductById(productId);
                product.fotos.push(req.file.id);
                let modifiedProduct = await apiProducts.updateProductById(product._id, product);
                if(Object.keys(modifiedProduct).length == 0){
                    res.status(500);
                    res.json({error: `There has been a problem updating the Product with your picture`})
                } else {
                    const imgUrl = `http://localhost:${config.PORT}/api/images/${req.file.filename}`
                    res.status(201)
                    res.send(imgUrl);
                }
            }
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error uploading the picture"})
        }
    }

    deleteImage = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            let deletedImage = await this.apiImages.deleteImage(id);
            if(Object.keys(deletedImage).length == 0){
                res.status(400);
                res.json({error: `The imageId provided is invalid`});
            } else {
                res.status(200);
                res.json(deletedImage);
            }
        }
        catch (error){
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error deleting the image."})
        }
    }

}