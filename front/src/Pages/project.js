
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Project() {
    const navigate = useNavigate();
    const { projectId } = useParams();//url로 받은 projectId 를 projecId로 할당 이 변수를 가지고 서버에 projectId에 해당하는 데이터를 요청
    const [project, setProject] = useState(null);
    const [todos, setTodos] = useState([]);

    // projectId를 사용하여 서버로부터 프로젝트 데이터를 불러와서 project , todos 변수에 할당( json 배열 형태 )하는 함수
    useEffect(() => {
        axios.get(`http://localhost:3000/project/${projectId}`)
            .then(response => {
                setProject(response.data);

                return axios.get(`http://localhost:3000/todo/${projectId}`);
            })
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [projectId]);

    // 렌더링 로직 및 기타 함수들...

    const handleStart = (todoId) => {
        const startTime = new Date();
        axios.post(`http://localhost:3000/todo/start`, {
            startTime: startTime.toISOString(),
            todoId: todoId,
            projectId: projectId
        })
            .then(response => {
                updateTodoState(todoId, { startTime: startTime });
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    };

    const handleStop = (todoId) => {
        const stopTime = new Date();
        const success = true;
        axios.post(`http://localhost:3000/todo/stop`, {
            stopTime: stopTime.toISOString(),
            todoId: todoId,
            projectId: projectId,
            success: success
        })
            .then(response => {
                updateTodoState(todoId, { stopTime: stopTime });
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    };

    //setTodos 함수 내부에서 map함수를 통해 todo 요소들을 업데이트 (직접적인 업데이트가 아닌 함수를 통한 조건적 업데이트)
    const updateTodoState = (todoId, updates) => {
        setTodos(todos => todos.map(todo =>
            todo.id === todoId ? { ...todo, ...updates } : todo
        ));
    };
    const navigateToReport = () => {
        navigate(`/WeeklyReport/${projectId}`);
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{project.name}</h1>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <span>{todo.name}</span>
                    {!todo.startTime && <button onClick={() => handleStart(todo.id)}>Start</button>}
                    {todo.startTime && !todo.endTime && <button onClick={() => handleStop(todo.id)}>Stop</button>}
                    {todo.endTime && <span>완료</span>}
                </div>
            ))}
            <button onClick={navigateToReport}>주간 보고서 보기</button>
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



