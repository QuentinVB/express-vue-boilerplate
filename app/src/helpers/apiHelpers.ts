import axios from 'axios'

/*
function dataFilter (data, type) {
  if (data === '') return null
  return data
}
*/

export function getAsync (url:string) {
/* await axios.get({
    method: 'GET',
    url: url,
    dataType: 'json',
    dataFilter: dataFilter,
});
*/
  return axios.get(url)
  //TODO add security here (if returned type is not a )
}


export function putAsync (url:string, data:Object) {
  /* await axios.get({
      method: 'PUT',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
    return axios.put(url,data)
}

export function postAsync (url:string, data:Object) {
  /* await axios.get({
      method: 'POST',
      url: url,
      dataType: 'json',
      dataFilter: dataFilter,
  });
  */
    return axios.post(url,data)
}