import HttpService from './http.service'

const httpService = new HttpService();

export class PollService {
  create = (data) => {
    return httpService.post('polls', data)
    .then(data => {
      return data;
  });
  }

  update = (id, data) => {
    console.log(data)
    return httpService.put(`polls/${id}`, data)
    .then(data => {
      return data;
  });
  }

  delete = (id) => {
    return httpService.delete(`polls/${id}`)
    .then(data => {
      return data;
  });
  }

  get = (id) => {
    return httpService.get(`polls/${id}`)
    .then(data => {
        return data;
    });
  }

  getAll = () => {
    return httpService.get(`polls/all`)
    .then(data => {
        return data;
    });
  }

}
