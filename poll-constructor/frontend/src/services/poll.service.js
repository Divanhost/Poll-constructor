import HttpService from './http.service'

const httpService = new HttpService();

export class PollService {
  create = (data) => {
    return httpService.post('polls', data)
    .then(data => {
      return this.returnData(data);
  });
  }

  update = (id, data) => {
    console.log(data)
    return httpService.put(`polls/${id}`, data)
    .then(data => {
      return this.returnData(data);
  });
  }

  delete = (id) => {
    return httpService.delete(`polls/${id}`)
    .then(data => {
      return this.returnData(data);
  });
  }

  get = (id) => {
    return httpService.get(`polls/${id}`)
    .then(data => {
      return this.returnData(data);
    });
  }

  getAll = () => {
    return httpService.get(`polls/all`)
    .then(data => {
      return this.returnData(data);
    });
  }

  returnData = (data) => {
    if(data.errors){
      return ({
        errors: data.errors,
        errorCode: data.errorCode
      })
    } else {
      return data;
    }
  }

}
