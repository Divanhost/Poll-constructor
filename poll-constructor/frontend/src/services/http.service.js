const API = "https://localhost:5001/api/";


export default class HttpService {
    defaultHeaders = () => {
        const user = JSON.parse(localStorage.getItem('user'));
      
        if (user && user.accessToken) {
          return { 
            'Content-type': 'application/json',
             Authorization: 'Bearer ' + user.accessToken,
            'Access-Control-Allow-Origin': '*' };
        } else {
          return {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
          };
        }
      }
    get(url) {
        return fetch(API + url, {
            method: 'get',
            headers: this.defaultHeaders
          })
    }
    post(url, params) {
        return fetch(API + url, {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Access-Control-Request-Method': 'POST' ,
                'Access-Control-Request-Headers': 'Content-Type',
                'Origin': 'http://localhost:3000/'
              },
            body: JSON.stringify(params)
          })
    }

//   login(username, password){
//     return axios
//       .post(API_AUTH + "login", {
//         username,
//         password
//       })
//       .then(response => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }
//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(username, password, fullName) {
//     debugger
//     return axios.post(API_USER, {
//       username,
//       password,
//       fullName,
//     }, { headers:{'Access-Control-Allow-Origin': '*'} });
//   }
//   checkUsername(username) {
//     return axios.get(API_USER +`/username?${username}` , { headers: authHeader() });
//   }

//   getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem('user'));;
//   }
}
