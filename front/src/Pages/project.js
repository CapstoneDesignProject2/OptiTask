
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Project() {
    const navigate = useNavigate();
    const { projectId } = useParams();//url로 받은 projectId 를 projecId로 할당 이 변수를 가지고 서버에 projectId에 해당하는 데이터를 요청
    const [project, setProject] = useState(null);
    const [todos, setTodos] = useState([]);


    const styles = {
        deleteButton: {
            padding: '10px 20px',
            margin: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'red',
            color: 'white',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f7f7f7',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        todoItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            margin: '10px 0',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            width: '100%',
        },
        button: {
            padding: '10px 20px',
            margin: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
        },
        checkbox: {
            marginRight: '10px',
        }

    };


    // projectId를 사용하여 서버로부터 프로젝트 데이터를 불러와서 project , todos 변수에 할당( json 배열 형태 )하는 함수
    useEffect(() => {
        axios.get(`http://localhost:3000/project/${projectId}`)
            .then(response => {
                console.log('Project data:', response.data);
                setProject(response.data);

                return axios.get(`http://localhost:3000/todo/${projectId}`);
            })
            .then(response => {
                console.log('Todos data:', response.data.todosByProjectId);
                setTodos(response.data.todosByProjectId);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [projectId]);

    // 렌더링 로직 및 기타 함수들...

    const handleDeleteProject = () => {
        // 서버에 DELETE 요청을 보내는 부분
        const numericProjectId = Number(projectId);

        axios.delete(`http://localhost:3000/project`, {
            headers: { "Content-Type": "application/json" },
            data: { projectId: numericProjectId }
        })
            .then(response => {
                // 프로젝트 삭제에 성공했을 때의 처리
                console.log('Project deleted:', response.data);
                navigate('/'); // 홈으로 이동하거나 다른 페이지로 리디렉트할 수 있습니다
            })
            .catch(error => {
                // 오류 처리
                console.error('Error deleting project:', error);
                alert('프로젝트 삭제 중 오류가 발생했습니다.'); // 사용자에게 오류를 알림
            });
    };

    const handleSuccessChange = (todoId, isChecked) => {
        setTodos(todos => todos.map(todo =>
            todo.todoId === todoId ? { ...todo, success: isChecked } : todo
        ));
    };

    const handleStart = (todoId) => {
        alert("Start 버튼이 눌렸습니다.");
        const startTime = new Date();
        const userId = 23
        const numericProjectId = Number(projectId);
        const numerictodoId = Number(todoId);

        const startTimedata = {
            userId: userId,
            startTime: startTime,
            todoId: numerictodoId,
            projectId: numericProjectId
        }

        axios.post(`http://localhost:3000/todo/start`, JSON.stringify(startTimedata), {
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                updateTodoState(todoId, { startTime: startTime });

                return axios.get(`http://localhost:3000/todo/${projectId}`);
            })
            .then(response => {
                console.log('retry Todos data:', response.data.todosByProjectId);
            })
            .catch(error => {
                console.error('Network error:', error);
            });

    };

    const handleStop = (todoId) => {
        alert("Stop 버튼이 눌렸습니다.");
        const stopTime = new Date();
        // success 값을 찾아서 해당 todo의 현재 상태에 따라 설정합니다.
        const todo = todos.find(todo => todo.todoId === todoId);
        const success = todo ? todo.success : false;
        const userId = 23
        const numericProjectId = Number(projectId);
        const numerictodoId = Number(todoId);

        const stopTimedata = {
            userId: userId,
            stopTime: stopTime,
            todoId: numerictodoId,
            projectId: numericProjectId,
            sucess: success // success 상태를 서버로 전송
        }

        axios.post(`http://localhost:3000/todo/stop`, JSON.stringify(stopTimedata), {
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                updateTodoState(todoId, { stopTime: stopTime, success: success });
                return axios.get(`http://localhost:3000/todo/${projectId}`);
            })
            .then(response => {
                console.log('retry stopTodos data:', response.data.todosByProjectId);
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    };

    //setTodos 함수 내부에서 map함수를 통해 todo 요소들을 업데이트 (직접적인 업데이트가 아닌 함수를 통한 조건적 업데이트)
    const updateTodoState = (todoId, updates) => {
        setTodos(todos => todos.map(todo =>
            todo.todoId === todoId ? { ...todo, ...updates } : todo
        ));
    };
    const navigateToReport = () => {
        navigate(`/WeeklyReport/${projectId}`);
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <h1>{project.projectName}</h1>
            {todos.map((todo) => (
                <div key={todo.todoId} style={styles.todoItem}>
                    <span>{todo.todoName}</span>
                    <div>
                        <button onClick={() => handleStart(todo.todoId)} style={styles.button}>Start</button>
                        <button onClick={() => handleStop(todo.todoId)} style={styles.button}>Stop</button>
                        <input
                            type="checkbox"
                            checked={todo.success}
                            onChange={(e) => handleSuccessChange(todo.todoId, e.target.checked)}
                            style={styles.checkbox}
                        />
                        {todo.success ? <span>성공</span> : <span>진행</span>}
                    </div>
                </div>
            ))}
            <button onClick={navigateToReport} style={styles.button}>주간 보고서 보기</button>
            <button onClick={handleDeleteProject} style={styles.button}>프로젝트 삭제</button>
        </div>
    );
}

export default Project;

/*
todos의 객체 구조 예시
const todos = [
    { id: 1, name: "ToDo Item 1", description: "Description 1", startTime: null, stopTime: null, completed: false },
    { id: 2, name: "ToDo Item 2", description: "Description 2", startTime: null, stopTime: null, completed: false },
    // 기타 ToDo 항목들...
];
*/

//start랑 stop 전달해주고 어떻게 전달할지 body체크하시고 todos 객체 구조를 정확히 파악하시고 정도?



