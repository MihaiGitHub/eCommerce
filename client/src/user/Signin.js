import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
    const [ values, setValues ] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // higher order function - a function that returns another function
    // gets the hardcoded value that was passed to handleChange plus the onChange event
    const handleChange = name => event => {
        // take the rest of the state values and update with whichever field user updates
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: false, loading: true });

        // can use .then because signin returns a promise
        signin({ email, password })
        .then(data => {
            if(data.err){
                setValues({ ...values, error: data.err, loading: false });
            } else {
                // redirect user to dashboard
               authenticate(
                   data, 
                   () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                   }
               );
            }
        });
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    );

    // trigger redirect programatically
    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />;
        }
    }

    const signInForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange('email')} 
                    type="email" 
                    className="form-control" 
                    value={email}    
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={handleChange('password')} 
                    type="password" 
                    className="form-control" 
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
            
        </form>
    );

    return (
        <Layout 
            title="Signin" 
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
}

export default Signin;