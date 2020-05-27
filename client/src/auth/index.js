import { API } from '../config';

export const signup = user => {
    // returns a promise; make promise available using return fetch so can use signup.then
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: { // backend will respond with json data so need to accept it
            Accept: 'application/json',
            "Content-Type": "application/json"
        }, // send as a json string
        body: JSON.stringify(user)
    })
    .then(response => { console.log('response ', response)
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const signin = user => {
    // returns a promise; make promise available using return fetch so can use signup.then
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: { // backend will respond with json data so need to accept it
            Accept: 'application/json',
            "Content-Type": "application/json"
        }, // send as a json string
        body: JSON.stringify(user)
    })
    .then(response => { console.log('response ', response)
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}