import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Button from '../Components/Button';

function Home() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }
    const goToLogin = () => {
        navigate("/login");
    }
    const goToDirectionCreate = () => {
        navigate("/DirectionCreate");
    }

    return(
        <div>
            <container>
                <Row>
                    <Col xs={12}>
                        <h1 style={{ fontSize: 50, textAlign: 'center', marginBottom: '40px' } }>EarlyStopping</h1>
                        <Button text = "Login" onClick={goToLogin}></Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button text = "Create new Direction" onClick={goToDirectionCreate}></Button>
                    </Col>
                </Row>
            </container>
        </div>
    );
}

export default Home;