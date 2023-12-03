import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('reportId')
  findWeeklyReport(@Param('reportId') reportId: number) {
    return this.reportService.findWeeklyReport(reportId);
  }
  @Get('projectId')
  findWeeklyReportsByProjectId(@Param('projectId') projectId: number) {
    return this.reportService.findWeeklyReportsByProjectId(projectId)
  }
  @Get('/trend/:projectId')
  findReportTrend(@Param('projectId') projectId: number) {
    return this.reportService.findReportTrend(projectId);
  }
}
