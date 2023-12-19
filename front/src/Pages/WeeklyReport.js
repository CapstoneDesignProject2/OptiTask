import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../Components/Title';

const WeeklyReport = () => {
    const { projectId } = useParams();
    const [reports, setReports] = useState([]);
    const [reportTrend, setReportTrend] = useState({});
    const [advice, setAdvice] = useState('');
    const [reportId, setReportId] = useState(null);
    const [report, setReport] = useState(null);
    
    useEffect(()=>{
        axios.post(`http://localhost:3000/report`);
    },[]);
    

    const fucn = () => {
        // find Weekly Reports By ProjectID
        axios.get(`http://localhost:3000/report/project/${projectId}`)
            .then(response=> {
                console.log(response.data);
                setReportTrend(response.data);
            })

        // find report trend
        axios.get(`http://localhost:3000/report/trend/${projectId}`)
            .then(response=> {
                console.log(response.data);
                setReportTrend(response.data);
            })
        // //  find adivce for report trend
        // axios.get(`http://localhost:3000/report/trend/${projectId}/advice`)
        //     .then(response => {
        //         console.log(response.data);
        //     })
    }

    const findWeeklyReportsByProjectID = () => {
        axios.get(`http://localhost:3000/report/${reportId}`)
            .then(response=> {
                console.log(response.data);
                setReport(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }

    return (
        <div>
            <Title></Title>
            <button onClick={fucn}>report 데이터 받아오기</button>
            <br></br>
            <input type="text" value={reportId} onChange={(e) => setReportId(e.target.value)} placeholder="받고싶은report를 적으시오"/>
            <br/>
            <button onClick={findWeeklyReportsByProjectID}>report 한개 받아오기</button>
            
            {Array.isArray(reports) && reports.map((report, index) => ( 
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