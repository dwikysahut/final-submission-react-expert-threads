import Axios from 'axios';

Axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
export default Axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});
