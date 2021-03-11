import axios from 'axios'
import {API_URL, JPA_API_URL} from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const SESSION_TOKEN = 'authToken'
export const USER_ROLE = 'userRole'

class AuthenticationService{    
    async executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    async setSessionStorage(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(SESSION_TOKEN, token);
    }

    async returnUserRole(username){
        let token = await this.getJWTTokenHeader();        
        return axios.get(`${JPA_API_URL}/user/${username}`, {headers: { authorization: `${token}` }});       
    }

    async getJWTTokenHeader(token) {
        if(token === undefined && await this.isUserLoggedIn()){
            return 'Bearer ' + sessionStorage.getItem(SESSION_TOKEN)
        }
        else if (await this.isUserLoggedIn()){
            return 'Bearer ' + token
        }        
    }   

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return false
            return true
    }

    getCurrentUserRole(){
        let user = sessionStorage.getItem(USER_ROLE)
        if(user===null) return ''
            return user
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return ''
            return user
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(SESSION_TOKEN);
        sessionStorage.removeItem(USER_ROLE);
    }
}    

export default new AuthenticationService()