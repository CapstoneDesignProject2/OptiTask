import axios from 'axios';
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import AnalysisComponent from '../Components/AnalysisComponent';
import Title from '../Components/Title';


const WeeklyReport = () => {
    const { projectId } = useParams();
    const [reportArray, setReportArray] = useState([]);
    const [reportTrend, setReportTrend] = useState({});
    const [advice, setAdvice] = useState('');
    const [reportId, setReportId] = useState(null);
    const [report, setReport] = useState({});
    const [lastReport, setLastReport] = useState({});





    // report 전체 받아오기
    const findWeeklyReportsByProjectID = () => {
        // find Weekly Reports By ProjectID
        axios.get(`http://localhost:3000/report/project/${projectId}`)
            .then(response => {
                console.log(response.data);
                setReportArray(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert("weaklyReports 불러오기 실패");
            })
    }

    // // report 한개 받아오기
    // const findWeeklyReport = () => {
    //     axios.get(`http://localhost:3000/report/${reportId}`)
    //         .then(response=> {
    //             console.log(response.data);
    //             setReport(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         })
    // }

    const findReportTrend = () => {
        // find report trend
        axios.get(`http://localhost:3000/report/trend/${projectId}`)
            .then(response => {
                setReportTrend(response.data);
                console.log(reportTrend);
            })
    }

    // weakly report 접속해서 weakly report를 한개 생성함
    useEffect(() => {
        axios.post(`http://localhost:3000/report`);
        findWeeklyReportsByProjectID();
        findReportTrend();
    }, []);
    useEffect(() => {
        if (reportArray.length > 0) {
            setLastReport(reportArray[reportArray.length - 1]);
        }
    }, [reportArray]); // Dependency array

    // Options for the Line chart
    const lineChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // 스타일 정의
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const headerStyle = {
        textAlign: 'center',
        fontSize: '24px',
        color: '#333',
        marginBottom: '30px',
    };

    const chartContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    };

    const chartStyle = {
        width: '100%',
    };

    const reportDetailStyle = {
        fontWeight: 'bold', // 글자 굵게
        fontSize: '1.2em', // 글자 크기 증가
        margin: '5px 0', // 여백 추가
    };

    const adviceBubbleStyle = {
        backgroundColor: '#d9f2d9', // 연한 초록색 배경
        border: '1px solid #c3e6c3', // 연한 초록색 테두리
        borderRadius: '15px', // 모서리 둥글게
        padding: '15px', // 안쪽 여백
        marginTop: '20px', // 위쪽 여백
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
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
        <div style={containerStyle}>
            <Title style={headerStyle}>Weekly Report</Title>
            {lastReport && (
                <div>
                    <h3 style={headerStyle}>Last Report Details:</h3>
                    <p style={reportDetailStyle}>week: {reportArray.length - 1}</p>
                    <p style={reportDetailStyle}>이번주까지 project 활동 시간: {lastReport.weeklyTotalTime}</p>
                    <p style={reportDetailStyle}>이번주까지 완료한 Todo: {lastReport.successTodo}</p>
                    {/* ... other lastReport details ... */}
                </div>
            )}
            <h2 style={headerStyle}>프로젝트 Trend</h2>
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
            <div style={adviceBubbleStyle} >
                <h2 style={headerStyle}>추세에 대한 조언</h2>
                <AnalysisComponent style={{ marginBottom: '30px' }} />
            </div>
        </div>
    );
};

export default WeeklyReport;