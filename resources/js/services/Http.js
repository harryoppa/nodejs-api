import axios from 'axios'
import Ls from "./Ls";

const version = 'v1'
// const BASE_URL = `${process.env.MIX_APP_URL || (window.Laravel.appUrl === '/' ? '' : window.Laravel.appUrl) }`;
const BASE_URL = process.env.AJAX_URL ?? window.location.protocol + '//' + window.location.host + ':' + window.location.port;
const API_URL =  `${BASE_URL}/api/${version}/`;
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const AUTH_TOKEN = Ls.get('auth.token');

    if (AUTH_TOKEN) {
        config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
    }

    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
});

export function logout() {
    Ls.remove('auth.token');
    window.location.reload();
}

axios.interceptors.response.use(
    response => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                if (Ls.get('auth.token')) {
                    logout()
                }
            }
        }
        return Promise.reject(error);
    }
);

window.axios = axios;

export default axios