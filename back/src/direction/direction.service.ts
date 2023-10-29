import { Injectable } from '@nestjs/common';
import { Direction } from './entity/direction.entity';
import { CreateTargetDto } from './dto/create-target-dto';
import { UpdateTargetDto } from './dto/update-target-dto';
import { CreateObstacleDto } from './dto/create-obstacle-dto';
import { UpdateObstacleDto } from './dto/update-obstacle-dto';
import { DeleteObstacleDto } from './dto/delete-obstacle-dto';
import { CreateDailyHabitDto } from './dto/create-daily-habit-dto';
import { UpdateDailyHabitDto } from './dto/update-daily-habit-dto';
import { CreateCheckListDto } from './dto/create-check-list-dto';
import { UpdateCheckListDto } from './dto/update-check-list-dto';
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
  organization: process.env.GPT_ORG_ID,
});

@Injectable()
export class DirectionService {
  private directions: Direction[] = [];
  //모든 방향
  findAllDirection(): Direction[] {
    return this.directions;
  }
  //목표
  createTarget(createTargetDto: CreateTargetDto) {
    this.directions.push({
      id: this.directions.length + 1,
      target: createTargetDto.newTarget,
      obstacle: [],
      dailyHabit: [],
      checkList: [],
    });
  }
  updateTarget(updateTargetDto: UpdateTargetDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === updateTargetDto.id) {
        return {
          ...direction,
          target: updateTargetDto.updateTarget,
        };
      }
      return direction;
    });
  }
  //장애물
  createObstacle(createObstacleDto: CreateObstacleDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === createObstacleDto.id) {
        return {
          ...direction,
          obstacle: [...direction.obstacle, createObstacleDto.newObstacle],
        };
      }
      return direction;
    });
  }
  updateObstacle(updatedObstacleDto: UpdateObstacleDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === updatedObstacleDto.id) {
        return {
          ...direction,
          obstacle: direction.obstacle.map((obstacle, i) =>
            i === updatedObstacleDto.index ? updatedObstacleDto.updateObstacle : obstacle,
          ),
        };
      }
      return direction;
    });
  }
  deleteObstacle(deleteObstacleDto: DeleteObstacleDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === deleteObstacleDto.id) {
        return {
          ...direction,
          obstacle: direction.obstacle.filter((_, i) => i !== deleteObstacleDto.index),
        };
      }
      return direction;
    });
  }
  /* findObstacleForTarget(): string {
    return 'gpt 요청';
  } */
  //하루 습관
  createDailyHabit(createDailyHabitDto: CreateDailyHabitDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === createDailyHabitDto.id) {
        return {
          ...direction,
          dailyHabit: [...direction.dailyHabit, createDailyHabitDto.newDailyHabit],
        };
      }
      return direction;
    });
  }
  updateDailyHabit(updatedDailyHabit: UpdateDailyHabitDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === updatedDailyHabit.id) {
        return {
          ...direction,
          dailyHabit: direction.dailyHabit.map((dailyHabit, i) =>
            i === updatedDailyHabit.index ? updatedDailyHabit.updateDailyHabit : dailyHabit,
          ),
        };
      }
      return direction;
    });
  }
  /* findDailyHabitForTarget(): string {
    return 'gpt 요청';
  } */
  //체크리스트
  createCheckList(createCheckListDto: CreateCheckListDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === createCheckListDto.id) {
        return {
          ...direction,
          checkList: [...direction.checkList, createCheckListDto.newCheckList],
        };
      }
      return direction;
    });
  }
  updateCheckList(updatedCheckListDto: UpdateCheckListDto) {
    this.directions = this.directions.map((direction) => {
      if (direction.id === updatedCheckListDto.id) {
        return {
          ...direction,
          checkList: direction.checkList.map((checkList, i) =>
            i === updatedCheckListDto.index ? updatedCheckListDto.updateCheckList : checkList,
          ),
        };
      }
      return direction;
    });
  } 
}
