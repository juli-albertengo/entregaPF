import {MessagesDBMongoDAO} from './messagesDBMongo';

export class MessagesFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            case 'MONGO': return new MessagesDBMongoDAO()
            default: return new MessagesDBMongoDAO()
        }
    }
}