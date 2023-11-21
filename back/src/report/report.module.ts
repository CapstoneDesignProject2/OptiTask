import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ActivityService } from 'src/activity/activity.service';

@Module({
  providers: [ReportService, ActivityService],
  controllers: [ReportController]
})
export class ReportModule {}
