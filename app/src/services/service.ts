import { apiUrl } from '../constant'

/*
import axios from 'axios';

if(token){
 axios.defaults.headers = { Authorization: token };
}


*/

class Service {
  forgeUrl(enpoint: String) {
    return `${apiUrl}${enpoint}`
  }
}

export default Service
