const API = "https://localhost:5001/api/";

const defaultHeaders = () => {
  const userToken = JSON.parse(localStorage.getItem('user'));
  if (userToken) {
    return {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': '*'
    };
  } else {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Headers': 'Content-Type',
      'Content-type': 'application/json',
      'Access-Control-Allow-Method': '*'
    };
  }
}
export default class HttpService {

  get(url) {
    const headers = defaultHeaders();
    return fetch(API + url, {
      method: 'get',
      headers
    }).then(response => {
      return this.validResponse(response)
    })
  }
  post(url, params) {
    const headers = defaultHeaders();
    return fetch(API + url, {
      method: 'post',
      headers,
      body: JSON.stringify(params)
    }).then(response => {
      return this.validResponse(response)
    })
  }
  put(url, params) {
    const headers = defaultHeaders();
    return fetch(API + url, {
      method: 'put',
      headers,
      body: JSON.stringify(params)
    }).then(response => {
      return this.validResponse(response)
    })
  }

  delete(url) {
    const headers = defaultHeaders();
    return fetch(API + url, {
      method: 'delete',
      headers,
    }).then(response => {
      return this.validResponse(response)
    })
  }


  validResponse(response) {
    if (response.status === 401) {
      alert("you need to login again")
      return;
    }
    return response.json();
  }
}
