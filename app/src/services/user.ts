import { getAsync, putAsync, postAsync } from '../helpers/apiHelpers'
import User from '../models/User'
import Service from './service'

const endpoint = 'user' //message

class UserApiServices extends Service {
  getUsersAsync() {
    return getAsync(this.forgeUrl(`${endpoint}`))
  }
  getUserByIdAsync(uuid: String) {
    return getAsync(this.forgeUrl(`${endpoint}/${uuid}`))
  }
  createUserAsync(user: User) {
    return postAsync(this.forgeUrl(`${endpoint}`), { user: user })
  }
  updateUserAsync(uuid: String, user: User) {
    return putAsync(this.forgeUrl(`${endpoint}/${uuid}`), { user: user })
  }
}

export default new UserApiServices()
