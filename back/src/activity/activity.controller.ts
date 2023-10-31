import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityRequest } from './dto/create-activity-request';
import { UpdateActivityRequest } from './dto/update-activity-request';
import { DeleteActivityRequest } from './dto/delete-activity-request';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  //주간 활동 조회 (활동) GET
  @Get(':startDay/:endDay')
  findWeeklyActivity(@Param('startDay') startDay: Date, @Param('endDay') endDay: Date) {
    return this.activityService.findWeeklyActivity(startDay, endDay);
  }
  //활동 생성 (활동) POST
  @Post()
  createActivity(@Body() createActivityDto: CreateActivityRequest) {
    return this.activityService.createActivity(createActivityDto);
  }
  //활동 수정 (활동) PATCH
  @Patch()
  updateActivity(@Body() updateActivityDto: UpdateActivityRequest) {
    return this.activityService.updateActivity(updateActivityDto);
  }
  //활동 삭제 (활동) DELETE
  @Delete()
  deleteActivity(@Body() deleteActivityDto: DeleteActivityRequest) {
    return this.activityService.deleteActivity(deleteActivityDto);
  }
}
