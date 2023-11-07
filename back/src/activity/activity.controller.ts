import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityRequest, UpdateActivityRequest, DeleteActivityRequest } from './activity-dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  //주간 활동 조회 (활동) GET
  @Get(':pastWeeksAgo')
  findWeeklyActivity(@Param('pastWeeksAgo') pastWeeksAgo: number) {
    return this.activityService.findWeeklyActivity(pastWeeksAgo);
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
