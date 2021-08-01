const path = require('path');
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const config = require('../config');
const {ApiProducts} = require('../api/api.products');

const apiProducts = new ApiProducts();

const storage = new GridFsStorage({
    url: config.MONGO_CONNECTION_STRING,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: async(req, file) => {
        // Extension check
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        //CASE 1: Didn't provide valid ProductID => File will be later deleted.
        const {productId} = req.body
        const product = await apiProducts.getProductById(productId);
        if(Object.keys(product).length == 0){
            return{
                bucketName: 'FILE-WITHOUT-PRODUCTID',
                filename: `${Date.now()}-name-${file.originalname}`,
            }
        } else if(mimetype && extname){
        //CASE 2: ProductId is valid and filetype too => File will be stored properly.
            return {
                bucketName: 'images',
                filename: `${Date.now()}-name-${file.originalname}`,
            }
        } else {
        //CASE 3: The filetype is invalid => File will be later deleted
            return{
                bucketName: 'FILETYPE-NOT-ALLOWED',
                filename: `${Date.now()}-name-${file.originalname}`,
            }
        }
    },
});

const upload = multer({storage})

module.exports = upload;
