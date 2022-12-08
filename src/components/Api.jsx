import { Base64 } from 'js-base64';
import FormData from 'form-data'

/**
 * Get request with JWT token
 * @param {string} uri URL to get
 * @returns data from the response
 */
export const get = (uri) => {
    let username = 'charlotte';
    let password = '12345678';
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + Base64.encode(username + ":" + password));
    return fetch(uri, {
        method: 'GET',
        headers: headers,
    }).then(async (response) => {
        if (response.ok) {
            return response.json()
        }
        throw new Error((await response.json()).message)
    })
}