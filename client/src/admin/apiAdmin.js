import { API } from "../config";

export const createCategory = (userId, token, category) => {
  // returns a promise; make promise available using return fetch so can use signup.then
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      // backend will respond with json data so need to accept it
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, // send as a json string
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  // returns a promise; make promise available using return fetch so can use .then
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      // backend will respond with json data so need to accept it
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }, // send as form data
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      // backend will respond with json data so need to accept it
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }, // send as form data
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      // backend will respond with json data so need to accept it
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }, // send as form data
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      // backend will respond with json data so need to accept it
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, // send as form data
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Product CRUD operations
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      // backend will respond with json data so need to accept it
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      // backend will respond with json data so need to accept it
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }, // sending product as form data so no need content-type: application/json header
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
