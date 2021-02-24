import axios from "axios"

class PropertyManagementService{
    getAllProperties(name){
// console.log('executed service')
        // let username = "Blake"
        // let password = "Eversole"

        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return axios.get(`http://localhost:8080/property-management/${name}`
        // ,
        //     {headers: {authorization: basicAuthHeader}}        
        );
        /////////////
        // console.log('executed service')
        // return axios.get(`http://localhost:8080/property-management/${name}`,
        //     {
        //         headers : {
        //             authorization: 
        //         }
        //     }
        // );
    }

}

export default new PropertyManagementService()