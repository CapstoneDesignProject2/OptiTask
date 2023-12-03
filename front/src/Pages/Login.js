import React, { useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Button from '../Components/Button';
import Title from '../Components/Title';

function Login({}) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [id, setID] = useState("");
    const [pw, setPW] = useState("");

    const goToHome = () => {
        navigate("/");
    }

    const goToJoin = () => {
        navigate("/join");
    }

    const handleSignIn = async () => {
        try{
            const response = await axios.post("/auth/login", {username : id, pw});
            const data = response.data;

            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token); // JWT 토큰을 로컬 스토리지에 저장
                goToHome();
            } else {
                // 로그인 실패 처리
                alert("Login failed");
            }
        } catch(error) {
            console.error("Login error", error);
            alert("Login Failed");
        }
    };

    return(
        <div>
            <Title></Title>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder="ID" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <input type="password" value={pw} onChange={(e) => setPW(e.target.value)}placeholder="PW" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <Button type="submit" text = "Sign In" onClick={handleSignIn} style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>
            <Button type="submit" text = "Create Account" onClick={goToJoin} style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>
        </div>

    );
}

export default Login;