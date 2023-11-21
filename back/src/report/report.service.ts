import { Injectable } from '@nestjs/common';
import { Report } from './report-entity';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class ReportService {
  constructor(private readonly activityService: ActivityService) {}

  findWeeklyReport(pastWeeksAgo: number): Report {
    const report = new Report();
    let activities = [];
    report.totalTime = 0;
    report.tagTimes = {};
    report.successObstacle = [];
    activities = this.activityService.findWeeklyActivity(pastWeeksAgo);

    activities.forEach((activity) => {
      report.totalTime += activity.endTime.getTime() - activity.startTime.getTime();
      report.tagTimes[activity.tag] = (report.tagTimes[activity.tag] || 0) + (activity.endTime.getTime() - activity.startTime.getTime());
      report.successObstacle.push(...activity.success);
    });
    return report;
  }
}
