import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Title from '../Components/Title';

const WeeklyReport = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    

    useEffect(() => {
        axios.post('http://localhost:3000/report');
        //  weakly reports by projectid
        axios.get(`http://localhost:3000/report/${projectId}`)
            .then(response => {
                console.log(response.data);
            })

        // find report trend
        axios.get(`http://localhost:3000/report/trend/${projectId}`)
            .then(response=> {
                console.log(response.data);
            })
        //  find adivce for report trend
        axios.get(`http://localhost:3000/report/trend/${projectId}/advice`)
            .then(response => {
                console.log(response.data);
            })
    });
    

    return (
        <div>
            <Title></Title>
        </div>
    );
};

export default WeeklyReport;