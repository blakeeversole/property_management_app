import axios from 'axios'
import {API_URL} from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const SESSION_TOKEN = 'authToken'

class AuthenticationService{    
    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(SESSION_TOKEN, token)
        console.log(sessionStorage)
    }

    createJwtToken(token){
        return 'Bearer ' + token
    }

    getJWTTokenHeader(token) {
        if(token === undefined && this.isUserLoggedIn()){
            return 'Bearer ' + sessionStorage.getItem(SESSION_TOKEN)
        }
        else if (this.isUserLoggedIn()){
            return 'Bearer ' + token
        }        
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(SESSION_TOKEN);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return false
            return true
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return ''
            return user
    }
}    

export default new AuthenticationService()