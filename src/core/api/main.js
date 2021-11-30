import axios from "axios";

class API {
  constructor() {
    this.client = axios.create({ baseURL: "http://localhost:3000" });

    this.client.interceptors.response.use(({ data = [] }) => data),
      (error) => Promise.reject(error);
  }
}

export default new API();
