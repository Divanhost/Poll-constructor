import HttpService from './http.service'
import jwt_decode from 'jwt-decode'
const httpService = new HttpService();

export class AuthService {
  login = (username, password) => {
    return httpService.post('auth/login', {
      username,
      password
    }).then(data => {
      localStorage.setItem("user", JSON.stringify(data));
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register = (username, password, email, fullName) => {
    return httpService.post('user', {
      username,
      password,
      email,
      fullName
    });
  }
  
  getCurrentUser = () => {
    const user =  JSON.parse(localStorage.getItem('user'));
    if(user) {
      const decoded = jwt_decode(user);
      return decoded.sub;

    } else {
      return null; 
    }
  }
}
