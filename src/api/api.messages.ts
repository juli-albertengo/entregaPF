import { MessagesFactoryDAO } from '../models/DAOs/messagesFactoryDAO'

export class ApiMessages {
    public messagesDAO: any;

    constructor() {
        this.messagesDAO = MessagesFactoryDAO.get('MONGO')
    }

    async checkUsername(username: string){
        return await this.messagesDAO.checkUsername(username)
    }

    async saveMessage(userData: any, messageValue: any){
        return await this.messagesDAO.saveMessage(userData, messageValue);
    }

    async getAnswerFromServer(userData: any, messageValue: any){
        return await this.messagesDAO.getAnswerFromServer(userData, messageValue);
    }

}