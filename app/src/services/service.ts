import { API_URL } from '../constants'

/*
import axios from 'axios';

if(token){
 axios.defaults.headers = { Authorization: token };
}


*/

class Service {
  protected forgeUrl(enpoint: String) {
    return `${API_URL}${enpoint}`
  }
}

export default Service
