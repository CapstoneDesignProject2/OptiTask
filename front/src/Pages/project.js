import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProjectDetail() {
    const navigate = useNavigate();
    const { projectId } = useParams();//url로 받은 projectId 를 projecId로 할당 이 변수를 가지고 서버에 projectId에 해당하는 데이터를 요청
    const [project, setProject] = useState(null);
    const [todos, setTodos] = useState([]);

    // projectId를 사용하여 서버로부터 프로젝트 데이터를 불러와서 project , todos 변수에 할당( json 배열 형태 )하는 함수
    useEffect(() => {

        // 예시: setProject(...) 및 setTodos(...)
        //내부 로직의 예시: fetch(`/api/project/${projectId}`).then(...).then(data => setProject(data));
    }, [projectId]);

    const handleStart = (todoId) => {
        const startTime = new Date(); // 현재 시각
        fetch(`/api/todos/${todoId}/start`, {  //api주소는 임의 , 정적 url을 쓸거라면 body에 todoid를 첨부해야함
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startTime: startTime.toISOString() }),
        })
            .then(response => {
                if (response.ok) {
                    // 서버 응답이 성공적이면, ToDo 항목 상태 업데이트
                    // 두번쨰 인자로 key:value 객체로써 전달하는 이유는 update함수에서 todo 객체와 비교를 하기위함 즉, todo의 내부속성 starttime이 key:value 구조로 있기떄문에 맞춰주는것
                    updateTodoState(todoId, { startTime: startTime });

                } else {
                    // 에러 처리
                    console.error('Start time update failed');
                }
            })
            .catch(error => {
                // 네트워크 에러 처리
                console.error('Network error:', error);
            });
    };

    const handleStop = (todoId) => {
        const stopTime = new Date(); // 현재 시각
        fetch(`/api/todos/${todoId}/stop`, { //api주소는 임의
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stopTime: stopTime.toISOString() }),
        })
            .then(response => {
                if (response.ok) {
                    // 서버 응답이 성공적이면, ToDo 항목 상태 업데이트
                    updateTodoState(todoId, { stopTime: stopTime });
                } else {
                    // 에러 처리
                    console.error('Stop time update failed');
                }
            })
            .catch(error => {
                // 네트워크 에러 처리
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

export default ProjectDetail;

/*
todos의 객체 구조 예시 
const todos = [
    { id: 1, name: "ToDo Item 1", description: "Description 1", startTime: null, stopTime: null, completed: false },
    { id: 2, name: "ToDo Item 2", description: "Description 2", startTime: null, stopTime: null, completed: false },
    // 기타 ToDo 항목들...
];
*/