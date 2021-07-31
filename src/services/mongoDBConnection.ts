const config = require('../config');
const mongoose = require('mongoose');
const {loggerFile} = require('./logger');
const errorLog = loggerFile.GetLogger();
const {loggerConsole} = require('./logger');
const consoleLog = loggerConsole.GetLogger();

class MongoDBConnection{
    public db: any;
    public instance: number;

    constructor( ){
        this.db = null;
        this.instance = 0;
    }

    static async dbConnect(){
        try {
            await mongoose.connect(config.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
            //consoleLog.info(`dbConnect was called`);
            return `Mongo DB Connection established`;
        } catch (error) {
            errorLog.error(error);
            return error;
        }
    }

    async Get(){
        try{
            this.instance++;
            //consoleLog.info(`DbConnection called ${this.instance} times`);

            if(this.db != null){
                //consoleLog.debug(`Connection is already alive`);
                return this.db;
            } else {
                consoleLog.info(`Getting connection`);
                this.db = await MongoDBConnection.dbConnect();
                return this.db
            }
        } catch(error){
            errorLog.error(error);
            return error;
        }
    }
}

const mongoDBConnection = new MongoDBConnection();

export default mongoDBConnection;