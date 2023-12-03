import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from '../Components/Title';

function Home() {
    const navigate = useNavigate();
    //이거는 서버에서 받아서 프로젝트 컨테이너들 썸네일 데이터 넣을것들 + 해당 프로젝트 페이지로 넘어갈 용도
    const [projects, setProjects] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const goToLogin = () => {
        navigate("/login");
    }

    const goToLogout = () => {

    }


    // 서버에서 프로젝트 데이터를 가져오는 함수
    useEffect(() => {
        // 서버로부터 프로젝트 데이터를 가져오는 로직을 여기에 구현합니다.
        // 예시: fetch("/api/projects").then(...).then(data => setProjects(data));
    }, []);

    // 프로젝트 컨테이너를 클릭했을 때 실행되는 함수
    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    return (
        <div>
            <Title></Title>
            { document.cookie.length ? (
                <button onClick = {goToLogout}>Logout</button>
            ) : (
                <button onClick={goToLogin}>Login</button>
            )}
            <button onClick={() => navigate('/ProjectCreate')}>Create New Project</button>
            <div>
                {projects.map(project => (
                    <div key={project.id} onClick={() => handleProjectClick(project.id)} style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px' }}>
                        <h3>{project.name}</h3>
                        <p>Created on: {project.creationDate}</p>
                        {/* 추가 정보 및 썸네일 이미지 등을 여기에 표시할 수 있습니다. + project.데이터 형식에 맞게 수정해야 합니다 */}

                    </div>
                ))}
            </div>
            <button onClick={() => navigate('/mypage')} style={{ cursor: 'pointer', marginTop: '20px' }}>Go to MyPage </button>
        </div>
    );
}

export default Home;