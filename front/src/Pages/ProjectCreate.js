import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ProjectCreate() {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleTodoInputChange = (event) => {
        setTodoInput(event.target.value);
    };

    const handleAddTodo = () => {
        if (todoInput.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: todoInput, completed: false }]);
            setTodoInput('');
        }
    };

    const handleSubmit = () => {
        // ToDo 목록을 문자열 배열로 변환합니다.
        const todoList = todos.map(todo => todo.text);

        // 프로젝트 데이터 객체를 생성합니다.
        const projectData = {
            projectName,
            todoList,
            deadline: new Date(deadline).toISOString() // ISO 형식의 문자열로 변환
        };

        // 서버로 새 프로젝트 데이터를 POST 요청으로 전송합니다.
        fetch('/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
            .then(response => {
                if (response.ok) {
                    // 요청이 성공했으면 홈 페이지로 이동합니다.
                    navigate('/'); // 홈 페이지로 이동
                } else {
                    // 요청이 실패했다면 오류 메시지를 표시할 수 있습니다.
                    throw new Error('Something went wrong');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div>
            <h1 onClick={() => navigate("/")} style={{ cursor: 'pointer', fontSize: 50, textAlign: 'center', marginBottom: '40px' }}>Project Creator</h1>

            <input type="text" name="projectName" placeholder="Project Name" value={projectName} onChange={handleProjectNameChange} />
            <br />
            <input type="date" name="deadline" value={deadline} onChange={handleDeadlineChange} />
            <br />
            <input type="text" name="todoInput" placeholder="Add ToDo" value={todoInput} onChange={handleTodoInputChange} />
            <button onClick={handleAddTodo}>Add</button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>

            <button onClick={handleSubmit}>Complete Project Creation</button>
        </div>
    );
}

export default ProjectCreate;