import axios from 'axios'

const Addressbook_BASED_API_url = 'http://localhost:8089/addressbook'

class AddressBookService {

    addAddressBookData(data) {
        return axios.post(`${Addressbook_BASED_API_url}/create`, data);
      }
      getAllAddressbookData() {
        return axios.get(`${Addressbook_BASED_API_url}/get`);
      }
      deleteContact(id) {
        return axios.delete(`${Addressbook_BASED_API_url}/delete/${id}`);
      }
      getContact(id) {
        return axios.get(`${Addressbook_BASED_API_url}/get/${id}`);
      }
      updateAddressBookData(id, data) {
        return axios.put(`${Addressbook_BASED_API_url}/update/${id}`, data);
      }
    
    }
  export default new AddressBookService();