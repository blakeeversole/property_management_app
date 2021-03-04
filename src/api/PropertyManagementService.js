import axios from "axios"
import {JPA_API_URL} from '../Constants'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'

class PropertyManagementService{
    getAllProperties(){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/property-management`, {headers: { authorization: `${token}` }});
    }

    retrieveProperty(id){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/property-management/${id}`, {headers: { authorization: `${token}` }});
    }

    delete(name, id){
        // console.log('executed service')
        //return axios.delete(`${JPA_API_URL}/property-management/${id}`);
    }

    updateProperty(name, id, property){
        // console.log('executed service')
        //return axios.put(`${JPA_API_URL}/property-management/${id}`, property);
    }

    createProperty(name, property){
        // console.log('executed service')
        //return axios.post(`${JPA_API_URL}/property-management/`, property);
    }
}

export default new PropertyManagementService()