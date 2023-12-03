import React, { useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Button from '../Components/Button';
import Title from '../Components/Title';

function Join() {
    const navigate = useNavigate();
    const [id, setID] = useState("");
    const [pw, setPW] = useState("");
    

    const goToLogin = () => {
        navigate("/login");
    }

    const handleSignUp = async (id, pw) => {
        try{
            const response = await axios.post("/users/signup", {id, pw});
            if (response.data.success){
                goToLogin(); // 회원가입했으니 로그인하러 가기
            }
            else{
                alert("Signup Failed");
            }
        } catch(error) {
            console.error("Signup error", error);
            alert("Signup error");
        }
    };

    return(
        <div>
            <Title></Title>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder="ID" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <input type="password" value={pw} onChange={(e) => setPW(e.target.value)} placeholder="PW" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <Button type="submit" text = "Join" onClick={handleSignUp} style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>
        </div>
    );
}

export default Join;