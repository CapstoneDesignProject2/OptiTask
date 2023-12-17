import React from "react";
import {useNavigate} from 'react-router-dom';

const Title = () => {
  const navigate = useNavigate();

  const styles = {
    header: {
      color: '#333', // 글자색 설정
      fontSize: '70px', // 글자 크기 설정
      textAlign: 'center', // 글자를 가운데 정렬
      margin: '0', // 위아래 여백 제거
      padding: '20px 0', // 위아래 패딩 추가
      marginTop: '-80px'
  },
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <h1 onClick={goToHome} style={styles.header}>
      OptiTask
    </h1>
  );
};

export default Title;
