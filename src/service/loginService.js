import axios from 'axios'

const UserRegistration_Based_url = 'http://localhost:8089/UserRegistration'

class loginService{

    addContact(data){
        return axios.post(`${UserRegistration_Based_url}/create`,data);
    }
    
    login(data){
        return axios.post(`${UserRegistration_Based_url}/login`,data);
    }
    
}

export default new loginService()