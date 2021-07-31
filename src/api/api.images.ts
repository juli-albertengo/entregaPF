import {ImagesFactoryDAO} from '../models/DAOs/imagesFactoryDAO';

export class ApiImages {
    public imagesDAO: any

    constructor() {
        this.imagesDAO = ImagesFactoryDAO.get('MONGO')
    }

    async getImageById(id: string){
        return await this.imagesDAO.getImageById(id)
    }
    
    async deleteImage(id: string) { 
        return await this.imagesDAO.deleteImage(id) 
    }
}