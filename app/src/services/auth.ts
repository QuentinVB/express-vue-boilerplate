import { getAsync, postAsync } from '../helpers/apiHelpers'
import { type UserCredentials } from '../models/User'
import Service from './service'

const endpoint = 'auth'

class AuthServices extends Service {
  private USERID = localStorage.getItem('userId')
  private JWT_header = localStorage.getItem('JWT_header')
  private JWT_payload = localStorage.getItem('JWT_payload')

  public get JWT_TOKEN(): string {
    return `${this.JWT_header}.${this.JWT_payload}`
  }
  public get USER_ID(): string | null {
    return this.USERID
  }

  public get IsLogged(): boolean {
    return !!this.USERID && !!this.JWT_header && !!this.JWT_payload
  }

  public register() {
    //TODO
  }

  public async login(credentials: UserCredentials) {
    return postAsync(this.forgeUrl(`${endpoint}/login`), credentials)
      .then((res) => {
        //TODO : check if status 200
        this.USERID = res.data.userId
        localStorage.setItem('userId', res.data.userId)

        const splitedJWT = res.data.token.split('.')
        //should be length 2
        //console.log(splitedJWT.length === 2)
        const header = splitedJWT[0]
        const payload = splitedJWT[1]
        this.JWT_header = header
        this.JWT_payload = payload

        //store header and payload to LocalStorage
        localStorage.setItem('JWT_header', header)
        localStorage.setItem('JWT_payload', payload)

        //signature is stored in session cookie

      })
      .catch((err) => {
        console.error(err)
      })
  }

  public logout() {
    localStorage.removeItem('JWT_header')
    localStorage.removeItem('JWT_payload')

    return getAsync(this.forgeUrl(`${endpoint}/logout`));
  }
}

export default new AuthServices()
