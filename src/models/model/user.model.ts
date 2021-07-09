export class User {
    public firstName: string
    public lastName: string
    public email: string
    public username: string
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