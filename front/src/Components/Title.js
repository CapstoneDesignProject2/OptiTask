import React from "react";
import {useNavigate} from 'react-router-dom';

const Title = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <h1 onClick={goToHome} style={{ cursor: 'pointer' }}>
      OptiTask
    </h1>
  );
};

export default Title;
