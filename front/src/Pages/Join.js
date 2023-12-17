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
        }
    };

    const handleSignUp = async () => {
        try{
            const reqdata = {
                id: id,
                password: pw,
            };
            console.log(reqdata);
            const response = await axios.interceptors.request.use(async config => {
                const token = await LocalStorage.get('token');
                if (token) {
                  config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
              });
            console.log(response);
            if (response.data.success){
                goToLogin(); // 회원가입했으니 로그인하러 가기
            }
            else{
                alert("Signup Failed");
            }
        } catch(error) {
            console.error("Signup error", error);
            console.log(pw);
            console.log(id);
            alert("Signup error");
        }
    };

    return(
        <div style={styles.container}>
            <Title></Title>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)} placeholder="ID" style={styles.input} />
            <br />
            <input type="password" value={pw} onChange={(e) => setPW(e.target.value)} placeholder="PW" style={styles.input} />
            <br />
            <button type="submit" text = "Join" onClick={handleSignUp} style={styles.button}>Sign Up</button>
        </div>
    );
}

export default Join;