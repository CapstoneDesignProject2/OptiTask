import React, { useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Title from '../Components/Title';

function Mypage({}) {
    const navigate = useNavigate();
    const [id, setID] = useState('');
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (newPassword === currentPassword) {
            alert('현재 비밀번호와 동일합니다');
            return;
        }

        try {
            const reqdata = {
                id: id,
                newPassword: newPassword,
            };
            console.log(reqdata);

            const response = await axios.post('https://optitask.site/api/users/modify', JSON.stringify(reqdata), {
                headers: {"Content-Type": `application/json`},
            });
            console.log("response:", response);

            if (response.status === 201) {
                alert('비밀번호가 변경되었습니다.');
                navigate('/');
            } else {
                alert('비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('비밀번호 변경 요청 실패', error);
            alert("password change error");
        }
    }

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            color: 'black',
            backgroundColor: 'white',
            padding: '20px',
            maxWidth: '1200px', // 컨테이너 최대 너비 설정
            margin: '0 auto', // 가운데 정렬
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%', // 입력 필드를 감싸는 컨테이너 너비
        },
        input: {
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '80%', // 입력 필드 너비 설정
            maxWidth: '400px', // 입력 필드 최대 너비 제한
        },
        button: {
            cursor: 'pointer',
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'black',
            marginTop: '30px',
            color: 'white',
            fontSize: '18px',
            borderRadius: '5px',
            width: '80%', // 버튼 너비를 입력 필드와 동일하게 설정
            maxWidth: '400px', // 버튼 최대 너비 제한
        },
    };


    return (
        <div style={styles.container}>
            <Title></Title>
            {!showPasswordChange && (
                <>
                    <button style = {styles.button} onClick={logout}>Logout</button>
                    <button style = {styles.button} onClick={() => setShowPasswordChange(!showPasswordChange)}>비밀번호 변경</button>
                </>
            )}
            
            {showPasswordChange && (
                <div style={styles.inputContainer}>
                    <h3>비밀번호를 변경하십시오.</h3>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button style={styles.button} onClick={handleChangePassword}>Change Password</button>
                </div>
            )}
        </div>
    );
}
    
export default Mypage;