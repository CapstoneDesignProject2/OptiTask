import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { ActivityService } from '../activity/activity.service';
import { CreateActivityRequest } from '../activity/activity-dto';

describe('ReportService', () => {
  let service: ReportService;
  let activityService: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService, ActivityService],
    }).compile();

    service = module.get<ReportService>(ReportService);
    activityService = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  function createActivitiesForWeek(activityService: ActivityService){
    for (let i = 0; i < 7; i++) {
      const activity = new CreateActivityRequest();
      activity.startTime = new Date();
      activity.startTime.setDate(activity.startTime.getDate() - i);
      activity.endTime = new Date(activity.startTime);
      activity.endTime.setHours(activity.endTime.getHours() + 1);
      activity.content = `Activity ${i + 1}`;
      activity.tag = `Tag ${i + 1}`;
      activity.success = [`Success ${i + 1}`, `Success ${i + 10}`];
  
      activityService.createActivity(activity);
    }
  }
  describe('findWeeklyReport', () => {
    it('should return report for the past week', () => {
      createActivitiesForWeek(activityService);

      const report = service.findWeeklyReport(1);
      expect(report).toBeDefined();
      expect(report.totalTime).toBe(7 * 60 * 60 * 1000);
      expect(report.tagTimes['Tag 1']).toBeDefined();
      expect(report.tagTimes['Tag 2']).toBeDefined();
      expect(report.tagTimes['Tag 3']).toBeDefined();
      expect(report.tagTimes['Tag 4']).toBeDefined();
      expect(report.tagTimes['Tag 5']).toBeDefined();
      expect(report.tagTimes['Tag 6']).toBeDefined();
      expect(report.tagTimes['Tag 7']).toBeDefined();
      expect(report.successObstacle.length).toBe(14);
      expect(report.successObstacle).toContain('Success 1');
      expect(report.successObstacle).toContain('Success 2');
      expect(report.successObstacle).toContain('Success 3');
      expect(report.successObstacle).toContain('Success 4');
      expect(report.successObstacle).toContain('Success 5');
      expect(report.successObstacle).toContain('Success 6');
      expect(report.successObstacle).toContain('Success 7');
      expect(report.successObstacle).toContain('Success 10');
      expect(report.successObstacle).toContain('Success 11');
      expect(report.successObstacle).toContain('Success 12');
      expect(report.successObstacle).toContain('Success 13');
      expect(report.successObstacle).toContain('Success 14');
      expect(report.successObstacle).toContain('Success 15');
      expect(report.successObstacle).toContain('Success 16');
    });
  });
});


