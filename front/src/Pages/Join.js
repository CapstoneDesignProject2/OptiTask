import React, { useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Button from '../Components/Button';
import Title from '../Components/Title';

function Join() {
    const navigate = useNavigate();
    
    const goToHome = () => {
        navigate("/");
    }

    const handleSignUp = async (id, pw) => {
        
    };

    return(
        <div>
            <Title></Title>
            <input type="text" name="id" placeholder="ID" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <input type="password" name="pw" placeholder="PW" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <Button type="submit" text = "Join" style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>

        </div>

    );
}

export default Join;