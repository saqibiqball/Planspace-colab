import axios from "axios";
import K from "../utilities/constants";

export default class NetworkCall {
  static async fetch(request) {
    try {
      const response = await NetworkCall.axios({
        method: request.method,
        url: request.url,
        data: request.body,
        headers: request.headers,
      });
      return response.data;
    } catch (error) {
      return Promise.reject({
        error: error,
        message: K.Network.Default.Error,
        statusCode: 400,
      });
    }
  }
}
NetworkCall.axios = axios.create({
  baseURL: K.Network.URL.BaseAPI,
  timeout: K.Network.Timeout,
  headers: {},
});
