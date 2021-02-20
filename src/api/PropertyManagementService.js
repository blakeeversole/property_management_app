import axios from "axios"

class PropertyManagementService{
    getAllProperties(name){
        console.log('executed service')
        return axios.get(`http://localhost:8080/property-management/${name}`);
    }

}

export default new PropertyManagementService()