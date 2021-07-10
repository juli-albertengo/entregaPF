import {OrdersDBMongoDAO} from './ordersDBMongo';

export class OrdersFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            //case 'FILE': return new OrdersFileDAO('orders.json')
            case 'MONGO': return new OrdersDBMongoDAO()
            default: return new OrdersDBMongoDAO()
        }
    }
}