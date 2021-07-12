import { IsNotEmpty } from 'class-validator';

export class User {
    @IsNotEmpty()
    public firstName: string
    @IsNotEmpty()
    public lastName: string
    @IsNotEmpty()
    public email: string
    @IsNotEmpty()
    public username: string
    @IsNotEmpty()
    public password: string

    constructor(firstName: string, lastName: string, email: string, username: string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
    }

}

//MONGOOSE MODEL
var mongoose = require('mongoose');
 
module.exports = mongoose.model('Users',{
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});