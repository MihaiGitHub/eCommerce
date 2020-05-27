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

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const signout = (next) => {
    // remove token from local storage
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt');

        // custom callback (redirect user)
        next();

        // make request to backend to logout user
        return fetch(`${API}/signout`, {

        })
        .then(response => {

        })
        .catch(err => console.log(err))
    }

    
}