import axios from 'axios';
import {API_URL, BASIC_TOKEN, CLIENT_ID} from '../../env.json';
// http://172.30.251.160/api
// http://52.237.113.189/api'
const clientId = CLIENT_ID;
const headerAuth = BASIC_TOKEN;
const super_base_url = API_URL;
const base_url = `${super_base_url}/apim`;
const callApi = axios.create({baseURL: base_url});

export {headerAuth, super_base_url, base_url, clientId, callApi};
