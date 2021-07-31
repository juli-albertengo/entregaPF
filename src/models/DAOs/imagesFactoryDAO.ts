import {ImagesDBMongoDAO} from './imagesDBMongo';

export class ImagesFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            case 'MONGO': return new ImagesDBMongoDAO()
            default: return new ImagesDBMongoDAO()
        }
    }
}