import authService from '@/services/auth';
import axios from 'axios'

/*
function dataFilter (data, type) {
  if (data === '') return null
  return data
}
*/

function getAxiosConfig()
{
  const authConfig = authService.IsLogged ? {Authorization: `Bearer ${authService.JWT_TOKEN}`}:null;

  const config = 
  {
    headers: { ...authConfig },
    withCredentials: authService.IsLogged
  };
  return config;
}


export function getAsync(url: string) {
  /* await axios.get({
    method: 'GET',
    url: url,
    dataType: 'json',
    dataFilter: dataFilter,
});
*/
  return axios.get(url,getAxiosConfig())
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
  return axios.put(url, data,getAxiosConfig())
}

export function postAsync(url: string, data: Object) {
  /* await axios.get({
      method: 'POST',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
  return axios.post(url, data,getAxiosConfig())
}
