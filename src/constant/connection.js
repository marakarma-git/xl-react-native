import axios from 'axios';
const headerAuth = 'Basic eGwtZGNwLXNlY3VyaXR5OnhsLWRjcC1zZWN1cml0eS1zZWNyZXQ=';
// http://172.30.251.160/api
// http://52.237.113.189/api'
const api_link = axios.create({
  baseURL: 'http://172.30.251.160/api',
});

export default api_link;
export {headerAuth};
