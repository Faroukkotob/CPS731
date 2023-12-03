import React, { useEffect, useState } from 'react';
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from './login.jpg'; 

const Auth = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthenticatedUser(user);
        });
        return unsubscribe; 
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("User signed out");
            navigate('/'); 
        }).catch(error => {
            console.log("Sign out error", error);
        });
    };

    return (
        <div>
            {authenticatedUser === null ? (
                <Link to="/login" className="sidebar-item link-style">
                    <img src={loginIcon} alt="Login" className="sidebar-icon" />
                    Login
                </Link>
            ) : (
                <button className="sidebar-item" onClick={userSignOut}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default Auth;
export { auth, onAuthStateChanged, signOut };
