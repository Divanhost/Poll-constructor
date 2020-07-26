import HttpService from './http.service'

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
    return JSON.parse(localStorage.getItem('user'));;
  }
}
