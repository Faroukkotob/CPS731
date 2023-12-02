import React, { useEffect, useState } from 'react';
import { auth, app } from "../../firebase";
import '../LibraryManager/LibraryManager.css';
import Navbar from "../Navbar/Navbar";
import { onAuthStateChanged , signOut} from "firebase/auth";
import {Link} from "react-router-dom";

const Auth = () => {
    const [authenticatedUser, setauthenticatedUser] = useState("");

    useEffect( () => {
        const listenAuth = onAuthStateChanged(auth, (user) =>{
            if (user){
                setauthenticatedUser(user)
            }else {
                setauthenticatedUser(null)
            }
        }
        )
        return () => {
            listenAuth();

        }
    },[])

    const userSignOut = () => {
        signOut(auth).then(()=>{
            console.log("user signed out")
        }).catch(error => console.log("error"))
    }
    return (
        <>
        {authenticatedUser === null ? 
        <>
            <button className="sidebar-item"><Link to="/login" className="link-style">Login</Link></button>
        </> :
            <>
            <button className="sidebar-item" onClick={userSignOut}><Link to="/signup" className="link-style">Logout</Link></button>
</>
            }
        </>
    )
    };

  export default Auth;

  //                    <button className="sidebar-item">Logout</button>