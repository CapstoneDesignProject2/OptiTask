import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../Components/Title';

const WeeklyReport = () => {
    const { projectId } = useParams();
    const [reports, setReports] = useState([]);
    const [reportTrend, setReportTrend] = useState({});
    const [advice, setAdvice] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 주간 보고서 생성
        axios.post('/report')
            .then(() => {
                // 특정 프로젝트의 모든 주간 보고서 조회
                return axios.get(`/report/${projectId}`);
            })
            .then(response => {
                setReports(response.data);
                // 프로젝트의 추세 데이터 조회
                return axios.get(`/report/trend/${projectId}`);
            })
            .then(response => {
                setReportTrend(response.data);
                // 추세에 대한 조언 조회
                return axios.get(`/report/trend/${projectId}/advice`);
            })
            .then(response => {
                setAdvice(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching report data:', error);
                setIsLoading(false);
            });
    }, [projectId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Title></Title>
            {reports.map((report, index) => (
                <div key={index}>
                    <h2>{`Week ${report.reportWeek}`}</h2>
                    <p>{`Total Time: ${report.weeklyTotalTime}`}</p>
                    <p>{`Success Todos: ${report.successTodo}`}</p>
                </div>
            ))}
            <h2>프로젝트 추세</h2>
            {/* reportTrend 데이터를 사용하여 추세 정보 표시 */}
            <h2>추세에 대한 조언</h2>
            <p>{advice}</p>
        </div>
    );
};

export default WeeklyReport;