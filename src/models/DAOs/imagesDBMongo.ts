import mongoDBConnection from '../../services/mongoDBConnection';
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

let gfs: any;

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
});

export class ImagesDBMongoDAO {
    public connection: any;

    constructor() {
    }

    async getImageById(id: string){
        try {
            await mongoDBConnection.Get()
            const fileId = mongoose.mongo.ObjectId(id);
            const file = await gfs.files.findOne({_id: fileId});
            if(file == null || !file){
                return `File not found`;
            }
            const readStream = await gfs.createReadStream(file.filename);
            return readStream;
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async deleteImage(id: string){
        try {
            this.connection = await mongoDBConnection.Get() 
            const fileId = mongoose.mongo.ObjectId(id);
            gfs.collection("images");
            const deletedImage = await gfs.files.findOne({_id: fileId});
            const responseDeletion = await gfs.files.deleteOne({_id: fileId});
            if(responseDeletion.deletedCount > 0){
                return deletedImage;
            } else {
                return {};
            }
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }

    async deleteImageOfWrongProductId(id: string){
        try {
            this.connection = await mongoDBConnection.Get() 
            const fileId = mongoose.mongo.ObjectId(id);
            gfs.collection("FILE-WITHOUT-PRODUCTID");
            const deletedImage = await gfs.files.findOne({_id: fileId});
            const responseDeletion = await gfs.files.deleteOne({_id: fileId});
            if(responseDeletion.deletedCount > 0){
                return deletedImage;
            } else {
                return {};
            }
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }

    async deleteFileOfWrongType(id: string){
        try {
            this.connection = await mongoDBConnection.Get() 
            const fileId = mongoose.mongo.ObjectId(id);
            gfs.collection("FILETYPE-NOT-ALLOWED");
            const deletedImage = await gfs.files.findOne({_id: fileId});
            const responseDeletion = await gfs.files.deleteOne({_id: fileId});
            if(responseDeletion.deletedCount > 0){
                return deletedImage;
            } else {
                return {};
            }
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }
}