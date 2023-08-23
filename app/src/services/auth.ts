import { getAsync, postAsync } from '../helpers/apiHelpers'
import { type UserCredentials } from '../models/User'
import Service from './service'

const endpoint = 'auth'

class AuthServices extends Service {
  private USERID = '';
  private JWTTOKEN = '';

  public get JWT_TOKEN(): string {
    return this.JWTTOKEN
  }
  public get USER_ID(): string {
    return this.USERID
  }

  public get IsLogged() : boolean {
    return !!this.USERID && !!this.JWTTOKEN ;
  }
  

  public register() {
    //TODO
  }

  public async login(credentials: UserCredentials) {
    return postAsync(this.forgeUrl(`${endpoint}/login`), credentials)
      .then((res) => {
        //TODO : check if status 200
        console.log(res.data);
        this.USERID = res.data.userId;
        this.JWTTOKEN = res.data.token;

        //then store localy
        console.log(this.IsLogged)
      })
    .catch((err) => {
        console.error(err)
      })
  }

  public logout() {
    //TODO
  }
}

export default new AuthServices()
