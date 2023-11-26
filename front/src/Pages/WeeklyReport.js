import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function WeeklyReport() {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(''); // 유저 ID
    const [projectID, setProjectID] = useState('');
    const [reportDate, setReportDate] = useState('');
    const [reportID, setReportID] = useState('');
    const [achivement, setAchivement] = useState(0);
    const [week, setWeek] = useState(0);
    
    const goToHome = () => {
        navigate("/");
    }

    const fetchWeeklyReport = async(weeksAgo) => {
        const response = await fetch(`/api/weekly-report?pastWeeksAgo=${weeksAgo}`);
        const data = await response.json();


    }

    const showGraph = (event) => {

    }

    const showAchivement = (event) => {
        
    }

    return(
        <div>
            <h1 onClick={goToHome} style={{ fontSize: 50, textAlign: 'center', marginBottom: '40px' }}>EarlyStopping</h1>
            <div>

            </div>
            <div>

            </div>
        </div>

    );
}

export default WeeklyReport;