import axios from "axios"
import {JPA_API_URL} from '../Constants'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'

class PropertyManagementService{
    //Users
    getAllUsers(){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/users`, {headers: { authorization: `${token}` }});
    }    

    retrieveUser(){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/user`, {headers: { authorization: `${token}` }});
    }

    createUser(user) {
        let token = AuthenticationService.getJWTTokenHeader();
        return axios.post(`${JPA_API_URL}/users`, user, {headers: { authorization: `${token}` }});
    }
    
    //Properties
    getAllProperties(){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/property-management`, {headers: { authorization: `${token}` }});
    }

    retrieveProperty(id){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/property-management/${id}`, {headers: { authorization: `${token}` }});
    }
}

export default new PropertyManagementService()