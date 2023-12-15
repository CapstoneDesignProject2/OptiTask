import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Title from '../Components/Title';

const WeeklyReport = () => {
    const { userId, projectId } = useParams();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://backend:3000/report/${userId}/${projectId}");
                setReports(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchReports();
    }, [userId, projectId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Title></Title>
            <ul>
                {reports.map(report => (
                    <li key={report.reportId}>
                        <div>주차: {report.reportWeek}</div>
                        <div>총 작업 시간: {report.weeklyTotalTime}시간</div>
                        <div>성공한 할 일 수: {report.successTodo}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeeklyReport;