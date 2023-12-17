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

    // 스타일 설정
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            color: 'black',
            backgroundColor: 'white',
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        input: {
            width: '400px',
            height: '50px',
            fontSize: '20px',
            marginBottom: '15px',
            padding: '10px',
            border: '1px solid black',
            borderRadius: '5px',
        },
        button: {
            cursor: 'pointer',
            padding: '15px 30px',
            margin: '10px',
            border: 'none',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '20px',
            borderRadius: '5px',
            width: '150px',
            height: '50px',
        },
        h3: {
            textDecoration: 'underline', // h3 태그에 밑줄 추가
            cursor: 'pointer', // 클릭 가능함을 나타내기 위해 커서 변경
            // 필요한 경우 여기에 추가 스타일을 정의할 수 있습니다.
        }
    };

    const handleSignIn = async () => {
        try{
            const reqdata = {
                id: id,
                password: pw,
            };
            console.log(reqdata);
            const response = await axios.post("http://backend:3000/auth/login", JSON.stringify(reqdata), {
                headers: {"Content-Type": "application/json"},
            });
            console.log("response:" ,response);
            if (response.status === 201) {
                localStorage.setItem("access_token", response.data.access_token); // JWT 토큰을 로컬 스토리지에 저장
                console.log(localStorage.getItem(id));
                goToHome();
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
        <div style={styles.container}>
            <Title></Title>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder="ID" style={styles.input} />
            <br />
            <input type="password" value={pw} onChange={(e) => setPW(e.target.value)} placeholder="PW" style={styles.input} />
            <br />
            <button type="submit" text = "Sign In" onClick={handleSignIn} style={styles.button}>Sign In</button>
            <h3 onClick={goToJoin} style={styles.h3}>or create your account</h3>
        </div>

    );
}

export default Login;