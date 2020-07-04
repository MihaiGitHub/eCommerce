import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {

    const [ values, setValues ] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        formData: ''
    });

    // destructure all values from state
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }

    // method runs when component mounts and anytime values changes
    useEffect(() => {
        init();
    }, []);

    // higher order function; a function that returns another function
    // function that will grab the name, then the event, then it will return
    const handleChange = name => event => {
        // determine field value
        // if its photo grab the event.target.files
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        // form data compiled into one variable 'formData' to be able to send to back-end
        formData.set(name, value);

        // set the state
        setValues({ ...values, [name]: value });
    }

    const { user, token } = isAuthenticated();

    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    error: '',
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
    }

    // photo field accepts everything that starts with image/*
    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                    <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                    <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                    <select onChange={handleChange('category')} className="form-control">
                        <option>Please select</option>
                        {categories && categories.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))}
                    </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                    <select onChange={handleChange('shipping')} className="form-control">
                        <option>Please select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                    <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    
    return (
        <Layout 
            title="Add a new product" 
            description={`Good day ${user.name}, ready to add a new product?`} 
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
}

export default AddProduct;