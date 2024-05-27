import axios from 'axios';
import { LocalStorageKeys, getInLocalStorage } from '../modules/auth/utils/sesion-storage';

const headers = {
    "Accept": 'aplication/json',
    "content-type": "application/json",
}

const apiUrl = {
    'local': import.meta.env.VITE_API_BASE,
    'envia': import.meta.env.VITE_API_ENVIA,
    'envia-geo': import.meta.env.VITE_API_ENVIA_GEO
}
function joinURL(baseURL, url) {
    return `${baseURL}${url}`;
}

function getToken() {
    return getInLocalStorage(LocalStorageKeys.TOKEN);
}


class HttpClient {

    constructor() {
        this.domain = `${import.meta.env.VITE_API_BASE}`;
    }

    async request(url, method = "GET", data = null, WS = 'local') {

        url = joinURL(apiUrl[WS], url)

        let options

        options = {
            method,
            url: url,
            headers,
        };

        if (data) options.data = data

        let token
        if(WS == 'local'){
            token = getToken()
        } else {
            token = import.meta.env.VITE_API_ENVIA_TOKEN
        }
        if (token) headers["Authorization"] = `Bearer ${token}`;

        return await axios.request(options)
            .then(response => {
                return response.data
            })
            .catch(error => {
                return {
                    error,
                    msj: 'error'
                }
            });

    }

    async post(url, data, WS = 'local') {
        const method = 'POST';
        return await this.request(url, method, data, WS)
    }

    async get(url, id, WS = 'local') {
        const method = 'GET';
        if (id) {
            url = `${url}/${id}`;
        }
        return await this.request(url, method, null, WS)
    }


    async delete(url, id) {
        const method = 'DELETE';
        if (id) {
            url = `${url}/${id}`;
        }
        return await this.request(url, method)
    }

    async update(url, id, data) {
        const method = 'PUT';
        if (id) {
            url = `${url}/${id}`;
        }

        return await this.request(url, method, data)

    }

}

export default HttpClient;
