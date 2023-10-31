import { Injectable } from '@nestjs/common';
import { CreateActivityRequest } from './dto/create-activity-request';
import { UpdateActivityRequest } from './dto/update-activity-request';
import { DeleteActivityRequest } from './dto/delete-activity-request';
import { Activity } from './entity/activity-entity';

@Injectable()
export class ActivityService {
  private activities: Activity[] = [];

  //주간 활동 조회 (활동) GET
  findWeeklyActivity(startDay: Date, endDay: Date): Activity[] {
    const weeklyActivity: Activity[] = [];
    this.activities.forEach((activity) => {
      if (startDay <= activity.startTime
        && activity.endTime <= endDay) {
        weeklyActivity.push(activity);
      }
    });
    return weeklyActivity;
  }
  //활동 생성 (활동) POST
  createActivity(createActivityDto: CreateActivityRequest) {
    this.activities.push({
      id: this.activities.length + 1,
      startTime: createActivityDto.startTime,
      endTime: createActivityDto.endTime,
      content: createActivityDto.content,
      tag: createActivityDto.tag,
      sucess: createActivityDto.sucess,
    });
  }
  //활동 수정 (활동) PATCH
  updateActivity(updateActivityDto: UpdateActivityRequest) {
    this.activities = this.activities.map((activity) => {
      if (activity.id === updateActivityDto.id) {
        return {
          ...activity,
          content: updateActivityDto.content,
          tag: updateActivityDto.tag,
          sucess: updateActivityDto.sucess,
        };
      }
      return activity;
    });
  }
  //활동 삭제 (활동) DELETE
  deleteActivity(deleteActivityDto: DeleteActivityRequest) {
    this.activities = this.activities.filter( (activity) => {
      if (activity.id !== deleteActivityDto.id) {
        return activity;
      }
    });
  }
}
