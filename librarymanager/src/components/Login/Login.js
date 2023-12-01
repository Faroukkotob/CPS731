import React from 'react';
import {Link} from "react-router-dom";



const Login = () => {

    const scopedStyles = `
    body {
        margin: 0;
        padding: 0;
        font-family: 'Abhaya Libre SemiBold', sans-serif;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

.background-element {
    position: absolute;
    top: -20px; /* Adjust the top position to create an overlap */
    left: -20px; /* Adjust the left position to create an overlap */
    width: 480px;
    height: 480px;
    flex-shrink: 0;
    border-radius: 50px;
    background: #3C615C;
    z-index: -1;
}

.background-element-bottom-left {
    position: absolute;
    bottom: -20px; /* Adjust the bottom position to create an overlap */
    right: -20px; /* Adjust the right position to create an overlap */
    width: 480px;
    height: 480px;
    flex-shrink: 0;
    border-radius: 50px;
    background: #3C615C;
    z-index: -1;
}

.login-container {
    display: flex;
    align-items: center;
    width: 1100px;
    height: 550px;
    border-radius: 50px;
    border: 10px solid #5B8078;
    background: #FFF;
    box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
}


.image-container {
    flex-shrink: 0;
    margin-right: 20px; /* Adjusted spacing between the image and the form */
    margin-left: 30px;
}

img {
    width: 88%;
    height: auto; /* Maintain aspect ratio */
    border-radius: 10px; /* Optional: Add border-radius to the image */
}

.form-container {
    flex-grow: 1;
    padding: 20px;
}

.input-group {
    margin-bottom: 20px;
}

label {
    color: #3C615C;
    font-family: 'Abhaya Libre SemiBold', sans-serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

input {
    color: #000;
    font-family: 'Abhaya Libre SemiBold', sans-serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    opacity: 0.5;
}

button {
    width: 100%;
    max-width: 350px; /* Adjusted maximum width */
    height: 60px; /* Adjusted height */
    border-radius: 30px;
    background: #3C615C;
    color: #FFF;
    font-family: 'Almarai', sans-serif;
    font-size: 24px; /* Adjusted font size */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    cursor: pointer;
}

.Link {
    margin-top: 20px;
}

.Link-text p {
    display: inline-block;
    color: rgba(0, 0, 0, 0.80);
    opacity: 0.7;
    font-family: 'Abhaya Libre SemiBold', sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-right: 10px; /* Add some spacing between text and button */
}

.signup-text button {
    display: inline-block;
    color: #3C615C;
    border: none;
    background: none;
    cursor: pointer;
    font-family: 'Abhaya Libre SemiBold', sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
.input-group input::placeholder {
    font-size: 18px; 
    color: #999; 
}

.link-style {
    color: #3C615C;
}

    `;
    return (
        <>
        <style>{scopedStyles}</style>
        <div className="login-container">
            <div className="background-element"></div>
            <div className="background-element-bottom-left"></div>
            <div className="image-container">
                <img src={process.env.PUBLIC_URL + '/login.png'} alt="Main Image" />
            </div>
            <div className="form-container">
                <div className="input-group">
                    <label htmlFor="email">Email</label><br /><br />
                    <input type="email" id="email" placeholder="johnDoe@gmail.com" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label><br /><br />
                    <input type="password" id="password" placeholder="Password" />
                </div>
                <button type="submit">Login</button>
                <div className="signup-text">
                    <p>Don’t have an account? <Link to="/signup" className="link-style">Sign-Up</Link></p>
                    <p>temp <Link to="/libraryManager" className="link-style">libraryManager</Link></p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;

