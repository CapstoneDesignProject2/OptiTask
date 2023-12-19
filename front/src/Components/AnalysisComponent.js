import React from 'react';

const AnalysisComponent = () => {

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '70%', // Set the width to half of the parent
        margin: '0 auto', // This will center the container
        padding: '20px', // Add some padding inside the container
        boxSizing: 'border-box', // This ensures padding doesn't affect the width
    };

    return (
        <div style={containerStyle}>
            <h3>Project Analysis and Suggestions</h3>
            <div>
                <h4>1주차</h4>
                <p>- 수행 시간: 20,000분</p>
                <p>- 완료된 Todo 항목: 3개</p>
            </div>
            <div>
                <h4>2주차</h4>
                <p>- 수행 시간: 21,000분</p>
                <p>- 완료된 Todo 항목: 2개</p>
                <p>- 누적 수행 시간: 41,000분</p>
                <p>- 누적 완료된 Todo 항목: 5개</p>
            </div>
            <div>
                <h4>3주차</h4>
                <p>- 수행 시간: 18,000분</p>
                <p>- 완료된 Todo 항목: 4개</p>
                <p>- 누적 수행 시간: 59,000분</p>
                <p>- 누적 완료된 Todo 항목: 9개</p>
            </div>
            <div>
                <h4>분석 및 유추:</h4>
                <p>- 수행 시간이 매우 높게 기록되어 있습니다. 일주일에 20,000분의 수행 시간은 현실적이지 않아 보입니다. 아마도 기록의 오류가 있거나 시간 측정 방법에 문제가 있을 수 있습니다. 완료된 Todo 항목은 증가하고 있지만 수행 시간 대비 완료된 항목 수를 고려할 때 효율성에 대한 의문이 생길 수 있습니다. 총 수행 시간이 증가하고 있지만 완료된 Todo 항목 수는 일정 부분에서 머무르는 경향이 있습니다.</p>
            </div>
            <div>
                <h4>개선할 점 및 제언:</h4>
                <p>- 현실적인 시간 기록: 수행 시간이 현실적으로 측정되지 않았을 가능성이 큽니다. 정확한 시간 측정 도구를 사용하고, 프로젝트 팀원과의 상의를 통해 현실적인 작업 시간을 설정하세요.</p>
                <p>- 효율적인 작업 관리: 수행 시간 대비로 보면 완료된 Todo 항목의 비율이 낮습니다. 작업의 우선순위를 재조정하고, 효율적인 작업 방법을 찾아 프로젝트의 진행 속도를 향상시키세요.</p>
                <p>- 프로젝트 일정 재조정: 현재의 수행 시간과 Todo 항목 완료 상황을 고려하여 프로젝트 일정을 재조정하세요. 현실적이고 실현 가능한 목표를 세우고 그에 따라 계획을 수정하세요.</p>
                <p>- 정기적인 회의 및 피드백: 팀원들과 정기적으로 회의를 통해 프로젝트 상황을 공유하고 피드백을 주고 받으세요. 팀원들과의 원활한 의사 소통이 프로젝트 진행에 도움이 될 것입니다.</p>
            </div>
        </div>
    );
};

export default AnalysisComponent;
