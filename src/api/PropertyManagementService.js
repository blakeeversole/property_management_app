import axios from "axios"
import {JPA_API_URL} from '../Constants'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'

class PropertyManagementService{
    //Users
    async getAllUsers(){
        let token = await AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/users`, {headers: { authorization: `${token}` }});
    }    

    async retrieveUser(){
        let token = await AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/user`, {headers: { authorization: `${token}` }});
    }

    async createUser(user) {
        let token = await AuthenticationService.getJWTTokenHeader();
        return axios.post(`${JPA_API_URL}/users`, user, {headers: { authorization: `${token}` }});
    }
    
    //Properties
    async getAllProperties(){
        let token = await AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/property-management`, {headers: { authorization: `${token}` }});
    }

    async retrieveProperty(id){
        let token = await AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/property-management/${id}`, {headers: { authorization: `${token}` }});
    }

    async deleteProperty(id) {
        let token = await AuthenticationService.getJWTTokenHeader();
        return axios.delete(`${JPA_API_URL}/property-management/${id}`, {headers: { authorization: `${token}` }});
    }

    async createProperty(property) {
        let token = await AuthenticationService.getJWTTokenHeader();
        return axios.post(`${JPA_API_URL}/property-management`, property, {headers: { authorization: `${token}` }});
    }

    async updateProperty(id, property) {
        let token = await AuthenticationService.getJWTTokenHeader();
        return axios.put(`${JPA_API_URL}/property-management/${id}`, property, {headers: { authorization: `${token}` }});
    }
}

export default new PropertyManagementService()