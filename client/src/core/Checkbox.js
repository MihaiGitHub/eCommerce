import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
    const [ checked, setChecked ] = useState([]);

    // higher order function
    const handleToggle = c => () => {
        // check if this category is already in the state with name of checked
        // if category not found in the state then it will return -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        // if currently checked was not already in checked state then push
        // else pull/take off
        if(currentCategoryId === -1){
            // this category is not already in the state so need to push it in the state
            newCheckedCategoryId.push(c);
        } else {
            // if already checked take it out
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categories.map((category, index) => (
        <li key={index} className="list-unstyled">
            <input 
                onChange={handleToggle(category._id)} 
                value={checked.indexOf(category._id === -1)} 
                type="checkbox" 
                className="form-check-input" 
            />
            <label className="form-check-label">{category.name}</label>
        </li>
    ));
};

export default Checkbox;