import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function WeeklyReport() {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(''); // 유저 ID
    const [reportDate, setReportDate] = useState('');
    const [reportID, setReportID] = useState('');

    const goToHome = () => {
        navigate("/");
    }


    return(
        <div>
            <h1 onClick={goToHome} style={{ fontSize: 50, textAlign: 'center', marginBottom: '40px' }}>EarlyStopping</h1>

        </div>

    );
}

export default WeeklyReport;