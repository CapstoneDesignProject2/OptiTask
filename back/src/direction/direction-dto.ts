//목표
export class CreateTargetDto {
  newTarget: string;
}

export class UpdateTargetDto {
  id: number;
  updateTarget: string;
}

//장애물
export class CreateObstacleDto {
  id: number;
  newObstacle: string;
}

export class UpdateObstacleDto {
  id: number;
  updateObstacle: string;
  index: number;
}

export class DeleteObstacleDto {
  id: number;
  index: number;
}

//하루 습관
export class CreateDailyHabitDto {
  id: number;
  newDailyHabit: string;
}

export class UpdateDailyHabitDto {
  id: number;
  updateDailyHabit: string;
  index: number;
}

//체크 리스트
export class CreateCheckListDto {
  id: number;
  newCheckList: string;
}

export class UpdateCheckListDto {
  id: number;
  updateCheckList: string;
  index: number;
}


