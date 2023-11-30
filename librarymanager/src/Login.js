import React from 'react';
import {Link} from "react-router-dom";
import './Login.css';

const Login = () => {
    return (
        <>
        <div className="login-container">
            <div className="background-element"></div>
            <div className="background-element-bottom-left"></div>
            <div className="image-container">
                <img src={process.env.PUBLIC_URL + '/login.png'} alt="Main Image" />
            </div>
            <div className="form-container">
                <div className="input-group">
                    <label htmlFor="email">Email</label><br /><br />
                    <input type="email" id="email" placeholder="email@gmail.com" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label><br /><br />
                    <input type="password" id="password" placeholder="Password" />
                </div>
                <button type="submit">Login</button>
                <div className="signup-text">
                    <p>Don’t have an account? <Link to="/signup" className="link-style">Sign-Up</Link></p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
