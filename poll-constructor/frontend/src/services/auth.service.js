import axios from "axios";
import authHeader from './auth-header'
import HttpService from './http.service'
const API_USER = "https://localhost:5001/api/user/";

const httpService = new HttpService();

export class AuthService {
  login(username, password) {
    return httpService.get('auth/login', {
      username,
      password
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register = (username, password, fullName) => {
    return httpService.post('user', {
      username,
      password,
      fullName
    });
  }
  
  checkUsername(username) {
    return axios.get(API_USER + `/username?${username}`, { headers: authHeader() });
  }

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
