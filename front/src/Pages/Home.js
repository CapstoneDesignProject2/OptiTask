import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectsPerPage = 3;
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        projectCard: {
            cursor: 'pointer',
            border: '1px solid black',
            padding: '20px', // 패딩 증가
            backgroundColor: 'salmon',
            color: 'white',
            width: '30%', // 프로젝트 카드 너비 증가
            margin: '10px', // 마진으로 카드 사이 간격 추가
            boxSizing: 'border-box', // 너비와 패딩을 포함한 총 너비 유지
            minHeight: '150px', // 프로젝트 카드 최소 높이 설정
        },
        button: {
            cursor: 'pointer',
            padding: '15px 30px', // 버튼 패딩 증가
            margin: '10px',
            border: 'none',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '18px', // 글씨 크기 증가
            borderRadius: '5px', // 버튼의 모서리 둥글게
        },

        create_button: {
            cursor: 'pointer',
            padding: '15px 30px', // 버튼 패딩 증가
            margin: '10px',
            border: 'none',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '18px', // 글씨 크기 증가
            borderRadius: '5px', // 버튼의 모서리 둥글게
            marginTop: '-20px'
        },

        header: {
            color: '#333', // 글자색 설정
            fontSize: '70px', // 글자 크기 설정
            textAlign: 'center', // 글자를 가운데 정렬
            margin: '0', // 위아래 여백 제거
            padding: '20px 0', // 위아래 패딩 추가
            marginTop: '-80px'
        },






        // ...나머지 스타일 유지
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const goToLogin = () => {
        navigate("/login");
    }

    useEffect(() => {
        // 사용자의 로그인 상태를 확인
        const token = localStorage.getItem('access_token');
        if (token) {
            // 서버로부터 프로젝트 데이터 가져오기
            axios.get(`https://optitask.site/api/project`)
                .then(response => {
                    // 성공적으로 데이터를 받아오면 state 업데이트
                    setProjects(response.data.AllProjects); // 응답 구조에 따라 변경될 수 있습니다.
                })
                .catch(error => {
                    console.error('Error fetching projects', error);
                });

            setIsLoading(false);
        } else {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            navigate('/login');
        }
    }, [navigate]);


    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);

    };

    const nextProjects = () => {
        if ((currentIndex + 1) * projectsPerPage < projects.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevProjects = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentProjects = projects
        .slice(currentIndex * projectsPerPage, (currentIndex + 1) * projectsPerPage);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>OptiTask</h1>
            <button style={styles.create_button} onClick={() => navigate(`/ProjectCreate`)}>Create New Project</button>
            <div style={styles.projectContainer}>
                {currentProjects.map(project => (
                    <div key={project.projectId} onClick={() => handleProjectClick(project.projectId)} style={styles.projectCard}>
                        <h3>{project.projectName}</h3>
                        <p>Created on: {project.deadline}</p>
                    </div>
                ))}
            </div>
            <div>
                <button style={styles.button} onClick={prevProjects} disabled={currentIndex === 0}>← Previous</button>
                <button style={styles.button} onClick={nextProjects} disabled={(currentIndex + 1) * projectsPerPage >= projects.length}>Next →</button>
            </div>
            <button style={styles.create_button} onClick={() => navigate('/Mypage')}>Go to MyPage</button>
        </div>
    );
}

export default Home;


