import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function DirectionCreate() {
    const navigate = useNavigate();
    const [direction, setDirection] = useState(''); // 유저가 입력한 방향
    const [target, setTarget] = useState(''); // 유저가 입력한 타켓
    const [goalsList, setGoalsList] = useState([]); // 서버에서 받은 gpt 리스트 목록


    const goToHome = () => {
        navigate("/");
    }


    //입력폼 상태 업데이트


    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };

    const handleTargetChange = (event) => {
        setTarget(event.target.value);
    };

    //입력폼 , 유저가 선택한 selecetedGoalIndex 를 모든 index와 비교하여 해당 index를 찾고 isselected 값을 반대로 조정 ex) 체크 해재라면 is selected가 true 였으니까 false로 전환
    const handleGoalSelect = (selectedGoalIndex) => {
        setGoalsList(currentGoals =>
            currentGoals.map((goal, index) =>
                index === selectedGoalIndex
                    ? { ...goal, isSelected: !goal.isSelected }
                    : goal
            )
        );
    };

    // 방향성과 목표를 서버에 POST하고 GPT로 생성된 목표 리스트를 받는 함수 , api 엔드포인트 수정 필요
    const handleSubmit = () => {
        fetch('/api/direction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ direction, target }),
        })
            .then(response => response.json())
            .then(data => {
                // 백엔드로부터 받은 GPT 리스트 데이터로 상태 업데이트, 서버에서 보내는 데이터 형식을 조율해야함
                setGoalsList(data.goals);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // 선택된 목표를 서버에 POST하는 함수 , api 엔드포인트 수정 필요
    const handleSubmitGoals = () => {
        //체크박스로 선택된 리스트들을 추출
        const selectedGoalsIds = goalsList.filter(goal => goal.isSelected).map(goal => goal.id);// 서버에 데이터 보낼때 데이터 객체들을 보내야할지 id만 보내야할지 모르겠음 일단id로 보냄
        fetch('/api/selected-goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedGoalsIds }),
        })
            .then(response => {
                if (response.ok) {
                    navigate('/schedule-management'); // 일정 관리 페이지로 넘어감 , 엔드포인트 이름 변경 필요
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            {/*홈으로 돌아가기 , 추가적으로 버튼을 통해 구현하는것이 좋아보임*/}
            <h1 onClick={goToHome} style={{ fontSize: 50, textAlign: 'center', marginBottom: '40px' }}>EarlyStopping</h1>

            {/*입력 필드 코드*/}
            방향 입력 : <input type="text" name="direction" placeholder="write direction" style={{ width: '400px', height: '30px', fontSize: '20px', marginBottom: '15px' }} onChange={handleDirectionChange} value={direction} />
            <br />
            목표 입력 : <input type="text" name="target" placeholder="write target" style={{ width: '400px', height: '30px', fontSize: '20px', marginBottom: '15px' }} onChange={handleTargetChange} value={target} />
            <br />

            {/*제출 버튼*/}
            <button onClick={handleSubmit}>Submit Direction and Target</button>

            {/* 목표 리스트 렌더링 체크박스 형식, 체크박스 선택시 입력폼 업데이트*/}
            <ul>
                {goalsList.map((goal, index) => (
                    <li key={goal.id}> {/* id가 유일하다고 가정 */}
                        <label>
                            <input
                                type="checkbox"
                                checked={goal.isSelected}
                                onChange={() => handleGoalSelect(index)}
                            />
                            {goal.text} {/* goal 객체 내의 텍스트 속성 */}
                        </label>
                    </li>
                ))}
            </ul>

            {/* 선택된 목표가 있을 때만 '선택된 목표 제출' 버튼 표시 */}
            {goalsList.some(goal => goal.isSelected) && (
                <button onClick={handleSubmitGoals}>Submit Selected Goals</button>
            )}
        </div>
    );
}

export default DirectionCreate;

/*
서버에서 받는 gpt 데이터 형식의 예
{
  "goals": [
    { "id": 1, "text": "Learn React", "isSelected": false },
    { "id": 2, "text": "Read a book", "isSelected": false }
  ]
}
*/