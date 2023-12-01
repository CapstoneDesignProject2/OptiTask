import React, { useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

function Mypage({}) {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const response = await fetch('/api/user-info'); // 임시로 넣어둠
    
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            setUserInfo(data); // 사용자 정보를 상태에 저장합니다.
        } catch (err) {
            setError(err.message); // 오류 메시지를 상태에 저장합니다.
        } finally {
            setLoading(false); // 로딩 상태를 false로 설정합니다.
        }
    };
    
    useEffect(() => {
        fetchUserInfo();
    }, []);
    
    // 로딩 상태, 에러 상태, 또는 사용자 정보에 따라 적절한 UI를 렌더링합니다.
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
     
    return (
        <div>
        <h1>My Page</h1>
        {userInfo && (
            <div>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            {/* 추가적으로 표시하고 싶은 사용자 정보를 여기에 추가합니다. */}
            </div>
        )}
        </div>
    );
};
    
export default Mypage;