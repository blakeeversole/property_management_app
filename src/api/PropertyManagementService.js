import axios from "axios"
import {JPA_API_URL} from '../Constants'

class PropertyManagementService{
    getAllProperties(name){
        return axios.get(`${JPA_API_URL}/property-management/${name}`);
    }

    retrieveProperty(name, id){
        // console.log('executed service')
        return axios.get(`${JPA_API_URL}/property-management/${name}/${id}`);
    }
}

export default new PropertyManagementService()