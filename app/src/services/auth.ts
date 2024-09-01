import router from '@/routes'
import { getAsync, postAsync } from '../helpers/apiHelpers'
import { type UserCreation, type UserCredentials } from '../models/User'
import Service from './service'
import UserApiServices from './user'
import User from '../models/User'
import { useUserStore } from '@/stores/user'
import type { AxiosError } from 'axios'

const endpoint = 'auth'
const isDev = process.env.NODE_ENV === 'development'

class AuthServices extends Service {
  private _USERID
  private _JWT_header
  private _JWT_payload

  public get JWT_TOKEN(): string {
    return `${this._JWT_header}.${this._JWT_payload}`
  }
  public get USER_ID(): string | null {
    return this._USERID
  }

  public get IsLogged(): boolean {
    return !!this._USERID && !!this._JWT_header && !!this._JWT_payload
  }

  /**
   *
   */
  constructor() {
    super()
    this._USERID = localStorage.getItem('userId')
    this._JWT_header = localStorage.getItem('JWT_header')
    this._JWT_payload = localStorage.getItem('JWT_payload')
  }

  public async register(credentials: UserCreation) {
    try {
      const res = await postAsync(this.forgeUrl(`${endpoint}/register`), credentials)
      //TODO : redirect to "confirm your mail" instead of login
      if (res.status == 201) router.push({ name: 'login' });
      if (isDev) console.info('User successfully registered');
      return 'Utilisateur crée, vérifiez vos e-mail'
    } catch (err:any) {
      if (isDev) console.error(err)
      throw err.response.data.error;
    }
  }

  public async login(credentials: UserCredentials) {
    try {
      const res = await postAsync(this.forgeUrl(`${endpoint}/login`), credentials)
      if (res.status !== 200) throw new Error('Not logged, something went wrong')

      this._USERID = res.data.userId
      localStorage.setItem('userId', res.data.userId)

      const splitedJWT = res.data.token.split('.')
      const header = splitedJWT[0]
      const payload = splitedJWT[1]
      this._JWT_header = header
      this._JWT_payload = payload

      //store header and payload to LocalStorage
      localStorage.setItem('JWT_header', header)
      localStorage.setItem('JWT_payload', payload)

      //store user info in store
      await this.updateUserInfo(this._USERID as string)

      if (isDev) console.info('User successfully logged')
      return res.data.msg
    } catch (err) {
      if (isDev) console.error(err)
      throw err
    }
  }

  public async updateUserInfo(userId: string) {
    if (!this.IsLogged) throw new Error('User not logged, cant update his info')
    const userStore = useUserStore()
    const userInfoRes = await UserApiServices.getUserByIdAsync<User>(userId)
    userStore.$patch({
      userName: userInfoRes.data.userName as string,
      credits: userInfoRes.data.credits as number,
      IsLogged: true
    })
  }

  public async logout(withServerCall = true):Promise<any> {
    const userStore = useUserStore()
    if (withServerCall) {
      try {
        await getAsync(this.forgeUrl(`${endpoint}/logout`));
        if (isDev) console.info('User logged out on Server')
      } catch (error) {
        if (isDev) console.info('Already logged out')
        return error;
      }
    }
    localStorage.removeItem('userId')
    localStorage.removeItem('JWT_header')
    localStorage.removeItem('JWT_payload')
    this._JWT_header = null
    this._JWT_payload = null
    this._USERID = null
    router.push({ name: 'home' })
    userStore.$reset()
    if (isDev) console.info('Successfully logged out on Client');
    return 'Déconnecté';
  }

  public async requestPasswordRecuperation(userEmail: string) {
    try {
      const res = await postAsync(this.forgeUrl(`${endpoint}/requestpasswordreset`), { userEmail })
      if (res.status !== 200) throw new Error('Email not send, something went wrong')
      //TODO : redirect to "confirm your mail" instead of login
      router.push({ name: 'login' })
      if (isDev) console.info('Email successfully send')
      return res.data.msg
    } catch (err) {
      if (isDev) console.error(err)
      throw err
    }
  }

  public async changePassword(id: string, password: string, key: string) {
    try {
      const res = await postAsync(this.forgeUrl(`${endpoint}/changepassword`), {
        id,
        password,
        key
      })
      if (res.status !== 200) throw new Error('Not changed, something went wrong')
      router.push({ name: 'login' })
      if (isDev) console.info('User password successfully changed')
      return res.data.msg
    } catch (err) {
      if (isDev) console.error(err)
      throw err
    }
  }
}

export default new AuthServices()
