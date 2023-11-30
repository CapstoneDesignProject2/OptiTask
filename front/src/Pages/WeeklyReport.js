import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function WeeklyReport() {
    const navigate = useNavigate();
    const [weeklyReport, setWeeklyReport] = useState(null);
    const [reportTrend, setReportTrend] = useState(null);

    
    const goToHome = () => {
        navigate("/");
    }

    const fetchWeeklyReport = async (pastWeeksAgo) => {
        const response = await fetch(`/report/${pastWeeksAgo}`);
        const data = await response.json();
        setWeeklyReport(data);
    };
    
    const fetchReportTrend = async () => {
        const response = await fetch('/report/trend');
        const data = await response.json();
        setReportTrend(data);
    };
    
    return(
        <div>
            <h1 onClick={goToHome} style={{ fontSize: 50, textAlign: 'center', marginBottom: '40px' }}>EarlyStopping</h1>
            {weeklyReport && (
                <div>
                </div>
            )}
      
            <h1>Report Trend</h1>
            {reportTrend && (
                <div>
                    <p>Total Time Trend: {reportTrend.totalTimeTrend.join(', ')}</p>
                    <p>Success ToDo Trend: {reportTrend.successToDoTrend.join(', ')}</p>
                    <p>Total Success ToDo: {reportTrend.totalSuccessToDo}</p>
                </div>
            )}
        </div>
    );
}

export default WeeklyReport;