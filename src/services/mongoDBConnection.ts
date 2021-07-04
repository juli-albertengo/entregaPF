const config = require('../config');
const mongoose = require('mongoose');

class MongoDBConnection{
    public db: any;
    public instance: number;

    constructor( ){
        this.db = null;
        this.instance = 0;
    }

    static async dbConnect(){
        try {
            await mongoose.connect(config.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
            console.log(`Se llamo a dbConnect`);
            return `Mongo DB Connection established`;
        } catch (error) {
            return error;
        }
    }

    async Get(){
        try{
            this.instance++;
            console.log(`DbConnection called ${this.instance} times`);

            if(this.db != null){
                console.log(`Connection is already alive`);
                return this.db;
            } else {
                console.log(`Getting connection`);
                this.db = await MongoDBConnection.dbConnect();
                return this.db
            }
        } catch(error){
            return error;
        }
    }
}

const mongoDBConnection = new MongoDBConnection();

export default mongoDBConnection;