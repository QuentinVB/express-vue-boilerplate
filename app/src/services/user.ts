import { getAsync, putFormAsync, postAsync } from '../helpers/apiHelpers'
import User from '../models/User'
import Service from './service'

const endpoint = 'api/user' //message

class UserApiServices extends Service {
  getUsersAsync() {
    return getAsync<User[]>(this.forgeUrl(`${endpoint}`))
  }
  getUserByIdAsync<User>(uuid: String) {
    return getAsync<User>(this.forgeUrl(`${endpoint}/${uuid}`))
  }
  createUserAsync(user: User) {
    return postAsync(this.forgeUrl(`${endpoint}`), { user: user })
  }
  updateUserAsync(uuid: String, form: FormData) {
    return putFormAsync(this.forgeUrl(`${endpoint}/${uuid}`), form)
  }
}

export default new UserApiServices()
