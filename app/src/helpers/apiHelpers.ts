import router from '@/routes'
import authService from '@/services/auth'
import axios from 'axios'

/*
function dataFilter (data, type) {
  if (data === '') return null
  return data
}
*/

function getAxiosConfig(additionnalHeader={}) {
  const authConfig = authService.IsLogged
    ? { Authorization: `Bearer ${authService.JWT_TOKEN}` }
    : null

  const config = {
    headers: { ...authConfig,...additionnalHeader },
    withCredentials: authService.IsLogged
  }
  return config
}

export function getAsync<T>(url: string) {
  /* await axios.get({
    method: 'GET',
    url: url,
    dataType: 'json',
    dataFilter: dataFilter,
});
*/
  return axios.get<T>(url, getAxiosConfig()).catch((e) => {
    if (e.response.status === 401) {
      router.push({ name: 'login' })
    }
    throw e
  })
  //TODO add security here (if returned type is not a )
}

export function putAsync(url: string, data: Object) {
  /* await axios.get({
      method: 'PUT',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
  return axios.put(url, data, getAxiosConfig()).catch((e) => {
    if (e.response.status === 401) {
      router.push({ name: 'login' })
    }
    throw e
  })
}
export function putFormAsync(url: string, data: Object) {
  /* await axios.get({
      method: 'PUT',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
  return axios.put(url, data, getAxiosConfig({'Content-Type':'multipart/form-data'})).catch((e) => {
    if (e.response.status === 401) {
      router.push({ name: 'login' })
    }
    throw e
  })
}


export function postAsync(url: string, data: Object) {
  /* await axios.get({
      method: 'POST',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
  return axios.post(url, data, getAxiosConfig()).catch((e) => {
    if (e.response.status === 401) {
      router.push({ name: 'login' })
    }
    throw e
  })
}
