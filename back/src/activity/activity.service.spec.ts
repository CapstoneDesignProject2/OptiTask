import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { CreateActivityRequest } from './activity-dto';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityService],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  function createActivitiesForWeek(service: ActivityService) {
    for (let i = 0; i < 7; i++) {
      const activity = new CreateActivityRequest();
      activity.startTime = new Date();
      activity.startTime.setDate(activity.startTime.getDate() - i);
      activity.endTime = new Date(activity.startTime);
      activity.endTime.setHours(activity.endTime.getHours() + 1);
      activity.content = `Activity ${i + 1}`;
      activity.tag = `Tag ${i + 1}`;
      activity.success = [`Success ${i + 1}`];
  
      service.createActivity(activity);
    }
  }
  describe('findWeeklyActivity', () => {
    it('should return activities for the past week', () => {
      createActivitiesForWeek(service);
  
      const activities = service.findWeeklyActivity(1);
      expect(activities.length).toBe(7);
    });
});
})
