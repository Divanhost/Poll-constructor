import HttpService from './http.service'
const API_USER = "https://localhost:5001/api/poll/";

const httpService = new HttpService();

export class PollService {
  create = (data) => {
    return httpService.post('poll', data)
    .then(response => {
      return response.json();
    });
  }

  update = (data) => {
    return httpService.put('poll', data).then(response => {
      return response.json();
    });
  }

  delete = (id) => {
    return httpService.delete(`poll/${id}`)
    .then(response => {
      return response.json();
    });
  }

  get = (id) => {
    return httpService.get(`poll/${id}`)
    .then(response => {
      return response.json();
    }).then(data => {
        return data;
    });
  }

  getAll = () => {
    return httpService.post(`poll/all`)
    .then(response => {
      return response.json();
    }).then(data => {
        return data;
    });
  }

}
