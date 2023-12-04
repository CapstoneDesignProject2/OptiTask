import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Title from '../Components/Title';

function Login({ }) {
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

    const handleSignIn = async (id, pw) => {
        try {
            const response = await axios.post("/auth/login", { id, pw });
            const data = response.data;

            if (data.access_token) {
                document.cookie = `session_id=${data.access_token}`;
                goToHome(); // 성공 시 홈 페이지로 이동
            } else {
                // 로그인 실패 처리
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error", error);
            alert("Login Failed");
        }
    };

    return (
        <div>
            <Title></Title>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder="ID" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <input type="password" value={pw} onChange={(e) => setPW(e.target.value)} placeholder="PW" style={{ width: '400px', height: '50px', fontSize: '20px', marginBottom: '15px' }} />
            <br />
            <Button type="submit" text="Sign In" style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>
            <Button type="submit" text="Create Account" onClick={goToJoin} style={{ width: '150px', height: '50px', fontSize: '20px', marginBottom: '15px' }}></Button>
        </div>

    );
}

export default Login;