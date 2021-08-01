import { IsNotEmpty } from 'class-validator';

export class Message{
    @IsNotEmpty()
    public userId: string
    @IsNotEmpty()
    public type: string
    @IsNotEmpty()
    public message: string


    constructor(userId: string, type: string, message: string){
        this.userId = userId;
        this.type = type;
        this.message = message;
    }
}

//MONGOOSE MODEL
import mongoose from 'mongoose';

const message = 'messages';

const messageSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    type: {type: String, required: true},
    message: {type: String, required: true},
})

const messageModel = mongoose.model(message, messageSchema);

export default messageModel;