import axios from "axios"
import {JPA_API_URL} from '../Constants'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'

class PropertyManagementService{

    //Applications
    async createApplication(application) {
        let token = await AuthenticationService.getJWTTokenHeader();
        return axios.post(`${JPA_API_URL}/application`, application, {headers: { authorization: `${token}` }});
    }
    
    async getIfUserHasApplied() {
        let username = AuthenticationService.getLoggedInUserName();
        let userId;
        await this.retrieveUser(username)
        .then((response) => 
            {userId = response.data.id}
        )

        let token = await AuthenticationService.getJWTTokenHeader();
        return axios.get(`${JPA_API_URL}/application/${userId}`, {headers: { authorization: `${token}` }});
    }

    //Users
    async getAllUsers(){
        let token = await AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/users`, {headers: { authorization: `${token}` }});
    }    

    async retrieveUser(username){
        let token = await AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/user/${username}`, {headers: { authorization: `${token}` }});
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