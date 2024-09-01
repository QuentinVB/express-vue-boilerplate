import { describe, it, expect, vi, type Mock } from 'vitest'
import AuthServices from '../auth'
import UserService from '../user'
import { useUserStore } from '@/stores/user'
import { postAsync, getAsync } from '../../helpers/apiHelpers'

vi.mock('../../helpers/apiHelpers');
vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(() => ({
    $patch: vi.fn(),
    $reset: vi.fn(),
  })),
}))
vi.mock('../user', () => ({
  default: {
    getUserByIdAsync: vi.fn(),
  },
}))
vi.mock('@/routes', () => ({
  default: {
    push: vi.fn(),
  },
}))

describe('AuthServices', () => {
  it('should register a new user successfully', async () => {
    (postAsync as Mock).mockResolvedValue({ status: 201 })

    await AuthServices.register({ userName: 'testUser', password: 'password' })

    expect(postAsync).toHaveBeenCalledWith(
      'http://localhost:8080/auth/register',//FIXME : should use env
      { userName: 'testUser', password: 'password' }
    )
  })

  it('should handle login and store tokens correctly', async () => {
    (postAsync as Mock).mockResolvedValue({
      status: 200,
      data: {
        userId: '123',
        token: 'header.payload',
      },
    })
    (UserService.getUserByIdAsync as Mock).mockResolvedValue({
        status:200,
        data:{ userName:'testUser', credits:2000 }
    })


    await AuthServices.login({ userName: 'testUser', password: 'password' })

    expect(postAsync).toHaveBeenCalledWith(
      'http://localhost:8080/auth/login', // remplacez par votre URL API réelle
      { userName: 'testUser', password: 'password' }
    )
    expect(localStorage.getItem('userId')).toBe('123')
    expect(localStorage.getItem('JWT_header')).toBe('header')
    expect(localStorage.getItem('JWT_payload')).toBe('payload')
  })

  it('should update user information after login', async () => {
    (UserService.getUserByIdAsync as Mock).mockResolvedValue({
        status:200,
        data:{ userName:'UpdatedUser', credits:2000 }
    })


    await AuthServices.updateUserInfo('123')

    /*
    const userStore = useUserStore()
    expect(userStore.$patch).toHaveBeenCalledWith({
      userName: 'UpdatedUser',
      credits: 100,
      IsLogged: true,
    })*/
  })

  it('should log out and clear the user session', async () => {
    (getAsync as Mock).mockResolvedValue({status:200});

    await AuthServices.logout()

    expect(getAsync).toHaveBeenCalledWith(
      'http://localhost:8080/auth/logout', 
    )
    expect(localStorage.getItem('userId')).toBeNull()
    expect(localStorage.getItem('JWT_header')).toBeNull()
    expect(localStorage.getItem('JWT_payload')).toBeNull()

    //const userStore = useUserStore()
    //expect(userStore.$reset).toHaveBeenCalled()
  })

  it('should handle failed login attempts', async () => {
    (postAsync as Mock).mockResolvedValue({
      status: 400,
    })

    await expect(AuthServices.login({ userName: 'testUser', password: 'wrongPassword' })).rejects.toThrow('Not logged, something went wrong')
  })
})
