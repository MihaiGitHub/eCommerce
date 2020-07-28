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

export const createProduct = (userId, token, product) => {
    // returns a promise; make promise available using return fetch so can use .then
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: { // backend will respond with json data so need to accept it
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }, // send as form data
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}