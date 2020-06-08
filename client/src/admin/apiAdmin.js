import { API } from '../config';

export const createCategory = (userId, token, category) => {
    // returns a promise; make promise available using return fetch so can use signup.then
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: { // backend will respond with json data so need to accept it
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }, // send as a json string
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}