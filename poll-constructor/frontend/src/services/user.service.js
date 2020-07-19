import axios from 'axios';
import authHeader from './auth-header';
// TODO: change port
const API_USER = 'https://localhost:5001/api/user';

export class UserService {

  getUser(id) {
    return axios.get(API_USER + `/${id}`, { headers: authHeader() });
  }
}

export default new UserService();