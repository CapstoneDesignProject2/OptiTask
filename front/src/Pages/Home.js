import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from '../Components/Title';


function Home() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectsPerPage = 3;

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
            marginTop: '-180px'
        },
        // ...나머지 스타일 유지
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const goToLogin = () => {
        navigate("/login");
    }

    useEffect(() => {
        // 사용자의 로그인 상태를 확인합니다.
        const token = localStorage.getItem('userToken');
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리디렉션합니다.
            navigate('/login');
        }

        // 서버로부터 프로젝트 데이터를 가져오는 로직
        // 데이터를 최신순으로 정렬
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
            <Title></Title>
            <button style={styles.create_button} onClick={() => navigate('/Projectcreate')}>Create New Project</button>
            <div style={styles.projectContainer}>
                {currentProjects.map(project => (
                    <div key={project.id} onClick={() => handleProjectClick(project.id)} style={styles.projectCard}>
                        <h3>{project.name}</h3>
                        <p>Created on: {project.creationDate}</p>
                    </div>
                ))}
            </div>
            <div>
                <button style={styles.button} onClick={prevProjects} disabled={currentIndex === 0}>← Previous</button>
                <button style={styles.button} onClick={nextProjects} disabled={(currentIndex + 1) * projectsPerPage >= projects.length}>Next →</button>
            </div>
            <button style={styles.create_button} onClick={() => navigate('/mypage')}>Go to MyPage</button>
        </div>
    );
}

export default Home;