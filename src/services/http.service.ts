import axios from "axios";

const httpApi = axios.create({
  baseURL:
    "https://hot-wheels-6ae02-default-rtdb.europe-west1.firebasedatabase.app",
});

const httpService = {
  get: httpApi.get,
  post: httpApi.post,
  put: httpApi.put,
  delete: httpApi.delete,
  patch: httpApi.patch,
};

export default httpService;
