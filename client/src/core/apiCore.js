import { API } from '../config';
import queryString from 'query-string';

export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
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

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }
    
    // returns a promise; make promise available using return fetch so can use signup.then
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: { // backend will respond with json data so need to accept it
            Accept: 'application/json',
            "Content-Type": "application/json"
        }, // send as a json string
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const list = params => {
    // Proper way to pass a query string to back-end in GET request
    const query = queryString.stringify(params);

    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}