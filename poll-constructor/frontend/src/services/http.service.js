const API = "https://localhost:5001/api/";

const defaultHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return { 
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`,
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
          })
    }
    post(url, params) {
      debugger
      const headers = defaultHeaders();
        return fetch(API + url, {
            method: 'post',
            headers,
            body: JSON.stringify(params)
          })
    }
    put(url, params) {
      return fetch(API + url, {
          method: 'put',
          headers: defaultHeaders,
          body: JSON.stringify(params)
        })
    }

    delete(url) {
      return fetch(API + url, {
          method: 'delete',
          headers: defaultHeaders
        })
  }
}
