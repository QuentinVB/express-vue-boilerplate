import Service from './service'
import axios from 'axios'

const endpoint = 'debug'

export interface Ping {
  status: string
  salt: string
  timestamp: number
}

class DebugApiServices extends Service {
  getPingAsync() {
    return axios.get<Ping>(this.forgeUrl(`${endpoint}/ping`))
  }
}

export default new DebugApiServices()
