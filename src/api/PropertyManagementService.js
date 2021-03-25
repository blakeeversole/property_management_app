import axios from "axios"
import {JPA_API_URL} from '../Constants'
import AuthenticationService from '../propertymanagement/authentication/AuthenticationService.js'

class PropertyManagementService{

    //Lease
    retrieveLease(leaseID){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/lease/${leaseID}`, {headers: { authorization: `${token}` }});
    }
    
    //Tenant
    createTenant(tenant) {
        let token = AuthenticationService.getJWTTokenHeader();
        return axios.post(`${JPA_API_URL}/tenant`, tenant, {headers: { authorization: `${token}` }});
    }
    
    async getIfUserHasLease() {
        let username = AuthenticationService.getLoggedInUserName();
        let userId;
        await this.retrieveUser(username)
        .then((response) => 
            {userId = response.data.id}
        )

        let token = AuthenticationService.getJWTTokenHeader();
        return axios.get(`${JPA_API_URL}/lease-check/${userId}`, {headers: { authorization: `${token}` }});
    }


    //Applications
    createApplication(application) {
        let token = AuthenticationService.getJWTTokenHeader();
        return axios.post(`${JPA_API_URL}/application`, application, {headers: { authorization: `${token}` }});
    }

    updateApplication(id, application) {
        let token = AuthenticationService.getJWTTokenHeader();
        return axios.put(`${JPA_API_URL}/application/${id}`, application, {headers: { authorization: `${token}` }});
    }

    getAllApplications(){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/applications`, {headers: { authorization: `${token}` }});
    }

    getAllArchivedApplications(){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/applications-archived`, {headers: { authorization: `${token}` }});
    }

    getAllApplicationsWithPropertyId(propertyID){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/applications/${propertyID}`, {headers: { authorization: `${token}` }});
    }
    
    async getIfUserHasApplied() {
        let username = AuthenticationService.getLoggedInUserName();
        let userId;
        await this.retrieveUser(username)
        .then((response) => 
            {userId = response.data.id}
        )

        let token = AuthenticationService.getJWTTokenHeader();
        return axios.get(`${JPA_API_URL}/application-check/${userId}`, {headers: { authorization: `${token}` }});
    }

    retrieveApplication(applicationID){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/application/${applicationID}`, {headers: { authorization: `${token}` }});
    }

    //Users
    getAllUsers(){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/users`, {headers: { authorization: `${token}` }});
    }    

    retrieveUser(username){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/user/${username}`, {headers: { authorization: `${token}` }});
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

    allowedToDeleteProperty(id){
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/property-management-allow-delete/${id}`, {headers: { authorization: `${token}` }});
    }

    deleteProperty(id) {
        let token = AuthenticationService.getJWTTokenHeader();        
        return axios.delete(`${JPA_API_URL}/property-management/${id}`, {headers: { authorization: `${token}` }});
    }

    createProperty(property) {
        let token = AuthenticationService.getJWTTokenHeader();
        return axios.post(`${JPA_API_URL}/property-management`, property, {headers: { authorization: `${token}` }});
    }

    updateProperty(id, property) {
        let token = AuthenticationService.getJWTTokenHeader();
        return axios.put(`${JPA_API_URL}/property-management/${id}`, property, {headers: { authorization: `${token}` }});
    }
}

export default new PropertyManagementService()