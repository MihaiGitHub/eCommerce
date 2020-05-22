import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

const Signup = () => {
    const [ values, setValues ] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password } = values;

    // higher order function - a function that returns another function
    // gets the hardcoded value that was passed to handleChange plus the onChange event
    const handleChange = name => event => {
        // take the rest of the state values and update with whichever field user updates
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const signup = user => {
        fetch(`${API}/signup`, {
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

    const clickSubmit = (event) => {
        event.preventDefault();

        signup({ name, email, password });
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
            
        </form>
    );

    return (
        <Layout 
            title="Signup" 
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    );
}

export default Signup;