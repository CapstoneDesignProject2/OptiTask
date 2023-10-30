import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { CreateTargetDto } from './dto/create-target-dto';
import { UpdateTargetDto } from './dto/update-target-dto';
import { CreateObstacleDto } from './dto/create-obstacle-dto';
import { UpdateObstacleDto } from './dto/update-obstacle-dto';
import { DeleteObstacleDto } from './dto/delete-obstacle-dto';
import { CreateDailyHabitDto } from './dto/create-daily-habit-dto';
import { UpdateDailyHabitDto } from './dto/update-daily-habit-dto';
import { CreateCheckListDto } from './dto/create-check-list-dto';
import { UpdateCheckListDto } from './dto/update-check-list-dto';

@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  //모든 방향 조회 (방향) GET
  @Get()
  findAllDirection() {
    return this.directionService.findAllDirection();
  }
  //목표 입력 (방향) POST
  @Post('/target')
  createTarget(@Body() createTargetDto: CreateTargetDto) {
    return this.directionService.createTarget(createTargetDto);
  }
  // 목표 수정 (방향) PATCH
  @Patch('/target')
  updateTarget(@Body() updateTargetDto: UpdateTargetDto) {
    return this.directionService.updateTarget(updateTargetDto);
  }
  // 장애물 입력 (방향) POST
  @Post('/obstacle')
  createObstacle(@Body() createObstacleDto: CreateObstacleDto) {
    return this.directionService.createObstacle(createObstacleDto);
  }
  // 장애물 수정 (방향) PATCH
  @Patch('/obstacle')
  updateObstacle(@Body() updateObstacleDto: UpdateObstacleDto) {
    return this.directionService.updateObstacle(updateObstacleDto);
  }
  // 장애물 삭제 (방향 -> 활동 -> 방향) – 시퀸스 PATCH
  @Delete('/obstacle')
  deleteObstacle(@Body() deleteObstacleDto: DeleteObstacleDto) {
    return this.directionService.deleteObstacle(deleteObstacleDto);
  }
  // 장애물 요청 (방향 -> gpt -> 방향) – 시퀸스 GET
 /*  @Get()
  findObstacleForTarget() {
    return this.directionService.findObstacleForTarget();
  } */
  // 하루 습관 입력 (방향) POST
  @Post('/daily-habit')
  createDailyHabit(@Body() createDailyHabitDto: CreateDailyHabitDto) {
    return this.directionService.createDailyHabit(createDailyHabitDto);
  }
  // 하루 습관 수정 (방향) PATCH
  @Patch('/daily-habit')
  updateDailyHabit(@Body() updateDailyHabitDto: UpdateDailyHabitDto) {
    return this.directionService.updateDailyHabit(updateDailyHabitDto);
  }
  // 하루 습관 요청 (방향 -> gpt -> 방향) – 시퀸스 GET
  /* @Get()
  findDailyHabitForObstacle() {
    return this.directionService.findDailyHabitForObstacle();
  } */
  // 체크 리스트 입력 (방향) POST
  @Post('/check-list')
  createCheckList(@Body() createCheckListDto: CreateCheckListDto) {
    return this.directionService.createCheckList(createCheckListDto);
  }
  // 체크 리스트 수정 (방향) PATCH
  @Patch('/check-list')
  updateCheckList(@Body() updateCheckListDto: UpdateCheckListDto) {
    return this.directionService.updateCheckList(updateCheckListDto);
  }
}
