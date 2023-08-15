import axios from "axios";
import { toast } from "react-toastify";

function transformData(data: any) {
  return data && !data._id ? Object.values(data) : data;
}

const httpApi = axios.create({
  baseURL:
    "https://hot-wheels-6ae02-default-rtdb.europe-west1.firebasedatabase.app",
});

httpApi.interceptors.response.use(
  (response) => {
    response.data = transformData(response.data);
    return response;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status >= 400;
    if (!expectedErrors) {
      toast.error("Ошибка сети");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: httpApi.get,
  post: httpApi.post,
  put: httpApi.put,
  delete: httpApi.delete,
  patch: httpApi.patch,
};

export default httpService;
