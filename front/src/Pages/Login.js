import React, { useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Button from '../Components/Button';

function Login({}) {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }
    const goToJoin = () => {
        navigate("/join");
    }

    const handleSignIn = async (id, pw) => {

    };

    return(
        <div>
            <h1 onClick={goToHome} style={{ fontSize: 50, textAlign: 'center', marginBottom: '40px' } }>EarlyStopping</h1>
            <input type="text" name="id" placeholder="ID" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <input type="password" name="pw" placeholder="PW" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <Button type="submit" text = "Sign In" style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>
            <Button type="submit" text = "Create Account" onClick={goToJoin} style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>
        </div>

    );
}

export default Login;