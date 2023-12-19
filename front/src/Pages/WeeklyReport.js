import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../Components/Title';
import AnalysisComponent from '../Components/AnalysisComponent';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


const WeeklyReport = () => {
    const { projectId } = useParams();
    const [reports, setReports] = useState([]);
    const [reportTrend, setReportTrend] = useState({});
    const [advice, setAdvice] = useState('');
    const [reportId, setReportId] = useState(null);
    const [report, setReport] = useState(null);
    
    // report 전체 받아오기
    const findWeeklyReportsByProjectID = () => {
        // find Weekly Reports By ProjectID
        axios.get(`http://localhost:3000/report/project/${projectId}`)
            .then(response=> {
                console.log(response.data);
                setReportTrend(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert("weaklyReports 불러오기 실패");
            })
    }
    
    // report 한개 받아오기
    const findWeeklyReport = () => {
        axios.get(`http://localhost:3000/report/${reportId}`)
            .then(response=> {
                console.log(response.data);
                setReport(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
    }

    const findReportTrend = () => {
        // find report trend
        axios.get(`http://localhost:3000/report/trend/${projectId}`)
        .then(response=> {
            console.log(response.data);
            setReportTrend(response.data);
        })
    }

    // weakly report 접속해서 weakly report를 한개 생성함
    useEffect(()=>{
        axios.post(`http://localhost:3000/report`);
        findWeeklyReportsByProjectID();
        findReportTrend();
        
    },[]);
    
    // Options for the Line chart
    const lineChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const chartContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px' // Add some space between the charts
    };

    const chartStyle = {
        width: '50%' // Adjust width as needed
    };

    // Function to prepare the data for the Line chart
    const getSuccessTodoChartData = () => {
        return {
            labels: reportTrend.successTodoTrend?.map((_, index) => `Week ${index + 1}`),
            datasets: [
                {
                    label: 'Success Todo Trend',
                    data: reportTrend.successTodoTrend,
                    fill: false,
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgba(75, 192, 192, 0.2)',
                },
            ],
        };
    };

    const getTotalTimeChartData = () => {
        return {
            labels: reportTrend.totalTimeTrend?.map((_, index) => `Week ${index + 1}`),
            datasets: [
                {
                    label: 'Total Time Trend',
                    data: reportTrend.totalTimeTrend,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],
        };
    };
    

    return (
        <div>
            <Title></Title>
            <input type="text" value={reportId} onChange={(e) => setReportId(e.target.value)} placeholder="받고싶은report를 적으시오"/>
            <br/>
            <button onClick={findWeeklyReport}>report 한개 받아오기</button>
            
            {Array.isArray(reports) && reports.map((report, index) => ( 
                <div key={index}>
                    <h2>{`Week ${report.reportWeek}`}</h2>
                    <p>{`Total Time: ${report.weeklyTotalTime}`}</p>
                    <p>{`Success Todos: ${report.successTodo}`}</p>
                </div>
            ))}
            <h2>프로젝트 Trend</h2>
            {/* reportTrend 데이터를 사용하여 추세 정보 표시 */}
            <div style={chartContainerStyle}>
                <div style={chartStyle}>
                    {reportTrend.successTodoTrend && (
                        <Line data={getSuccessTodoChartData()} options={lineChartOptions} />
                    )}
                </div>
            </div>
            <div style={chartContainerStyle}>
                <div style={chartStyle}>
                    {reportTrend.totalTimeTrend && (
                        <Line data={getTotalTimeChartData()} options={lineChartOptions} />
                    )}
                </div>
            </div>
            <h2>추세에 대한 조언</h2>
            <AnalysisComponent></AnalysisComponent>
        </div>
    );
};

export default WeeklyReport;