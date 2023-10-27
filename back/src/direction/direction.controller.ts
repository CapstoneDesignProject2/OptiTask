import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { DirectionService } from './direction.service';

@Controller('direction')
export class DirectionController {
    constructor(private readonly directionService: DirectionService) {}

// 모든 목표 조회 (방향) GET
/* @Get()
findAllTarget() {
    return this.directionService.findAllTarget();
} */
//목표 입력 (방향) POST
/* @Post()
createTarget(@Body() createTargetDto: CreateTargetDto) {
    return this.directionService.createTarget(createTargetDto);
} */
// 목표 수정 (방향) PATCH
/* @Patch()
updateTarget(@Body updateTargetDto: UpdateTargetDto) {
    return this.directionService.updateTarget();
} */
// 모든 장애물 조회 (방향) GET
/* @Get()
findAllObstacle() {
    return this.directionService.findAllObstacle();
} */
// 장애물 입력 (방향) POST
/* @Post()
createObstacle(@Body() createObstacleDto: CreateObstacleDto) {
    return this.directionService.createObstacle(createObstacleDto);
} */
// 장애물 수정 (방향) PATCH
/* @Patch()
updateObstacle(@Body updateObstacleDto: UpdateObstacleDto) {
    return this.directionService.updateObstacle();
} */
// 장애물 성공 입력 (방향 -> 활동 -> 방향) – 시퀸스 PATCH
/* @Patch()
updateObstacleSuccess(@Body updateObstacleSuccessDto: UpdateObstacleSuccessDto) {
    return this.directionService.updateObstacleSuccess(updateObstacleSuccessDto);
} */
// 장애물 요청 (방향 -> gpt -> 방향) – 시퀸스 GET
/* @Get()
findObstacleForTarget() {
    return this.directionService.findObstacleForTarget();
} */
// 모든 하루 습관 조회 (방향) GET
/* @Get()
findAllDailyHabit() {
    return this.directionService.findAllDailyHabit();
} */
// 하루 습관 입력 (방향) POST
/* @Post()
createDailyHabit(@Body() createDailyHabitDto: CreateDailyHabitDto) {
    return this.directionService.createDailyHabit(createDailyHabitDto);
} */
// 하루 습관 수정 (방향) PATCH
/* @Patch()
updateDailyHabit(@Body updateDailyHabitDto: UpdateDailyHabitDto) {
    return this.directionService.updateDailyHabit();
} */
// 하루 습관 요청 (방향 -> gpt -> 방향) – 시퀸스 GET
/* @Get()
findDailyHabitForObstacle() {
    return this.directionService.findDailyHabitForObstacle();
} */
// 모든 체크 리스트 조회 (방향) GET
/* @Get()
findAllCheckList() {
    return this.directionService.findAllCheckList();
} */
// 체크 리스트 입력 (방향) POST
/* @Post()
createCheckList(@Body() createCheckListDto: CreateCheckListDto) {
    return this.directionService.createCheckList(createCheckListDto);
} */
// 체크 리스트 수정 (방향) PATCH
/* @Patch()
updateCheckList(@Body updateCheckListDto: UpdateCheckListDto) {
    return this.directionService.updateCheckList();
} */
}
