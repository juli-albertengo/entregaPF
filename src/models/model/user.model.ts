import { IsInt, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class User {
    @IsNotEmpty()
    public fullName: string
    @IsNotEmpty()
    @IsInt()
    public phone: number
    @IsNotEmpty()
    @IsEmail()
    public email: string
    public admin: boolean
    @IsNotEmpty()
    public username: string
    @IsNotEmpty()
    @IsString()
    public password: string
    @IsNotEmpty()
    @IsString()
    public duplicatedPassword: string

    constructor(fullName: string, phone: number, email: string, admin: boolean, username: string, password: string, duplicatedPassword: string){
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.admin = admin || false;
        this.username = username;
        this.password = password;
        this.duplicatedPassword = duplicatedPassword;
    }

}

//MONGOOSE MODEL
var mongoose = require('mongoose');

const userModel = mongoose.model('Users',{
    fullName: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    admin: {type: Boolean, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
 
export default userModel;

