import { API_URL } from '../constants'

class Service {
  protected forgeUrl(enpoint: String) {
    return `${API_URL}${enpoint}`
  }
}

export default Service
