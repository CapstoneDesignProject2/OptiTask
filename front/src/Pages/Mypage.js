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
            justifyContent: 'space-around', // 요소들 사이의 공간을 균등하게 분배
            height: '100vh',
            color: 'black',
            backgroundColor: 'white',
            padding: '20px',
            maxWidth: '1200px', // 컨테이너 최대 너비 설정
            margin: '0 auto', // 가운데 정렬
        },
        projectContainer: {
            display: 'flex',
            justifyContent: 'space-around', // 프로젝트 사이의 공간을 균등하게 분배
            width: '100%', // 전체 너비 사용
            flexWrap: 'wrap', // 요소가 너무 많으면 다음 줄로 넘어감
        },
    };



    return (
        <div style={styles.container}>
            <Title></Title>
            <button onClick={logout}>logout</button>
            <button onClick={() => setShowPasswordChange(!showPasswordChange)}>
                비밀번호 변경
            </button>
            {showPasswordChange && (
                <div>
                    <input
                        type="text"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button onClick={handleChangePassword}>Change Password</button>
                </div>
            )}
        </div>
    );
}
    
export default Mypage;