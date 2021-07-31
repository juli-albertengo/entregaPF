import {OrdersDBMongoDAO} from './ordersDBMongo';

export class OrdersFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            case 'MONGO': return new OrdersDBMongoDAO()
            default: return new OrdersDBMongoDAO()
        }
    }
}