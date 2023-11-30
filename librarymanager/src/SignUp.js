import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
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
                        <label htmlFor="firstName">First Name</label><br /><br />
                        <input type="text" id="firstName" placeholder="John" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name</label><br /><br />
                        <input type="text" id="lastName" placeholder="Doe" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label><br /><br />
                        <input type="email" id="email" placeholder="email@gmail.com" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label><br /><br />
                        <input type="password" id="password" placeholder="Password" />
                    </div>
                    <button type="submit">Sign Up</button>
                    <div className="signup-text">
                      <p>Already Have An Account? <Link to="/" className="link-style">Sign-in</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
