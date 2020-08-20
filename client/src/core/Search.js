import React, { useState, useEffect } from 'react';
import { getCategories } from './apiCore';
import Card from './Card';

const Search = () => {
    const [ data, setData ] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setData({ ...data, categories: data })
            }
        });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const searchSubmit = () => {
        //
    }

    const handleChange = () => {
        //
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">Pick Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <input 
                        onChange={handleChange('search')} 
                        type="search" 
                        className="form-control" 
                        placeholder="Search by name" 
                    />
                </div>
                <div className="btn input-group-append" style={{ border: 'none' }}>
                        <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
        </div>
    );
};

export default Search;