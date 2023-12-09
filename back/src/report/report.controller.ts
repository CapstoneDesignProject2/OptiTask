import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { AdviceRequest, ReportTrend } from './report.dto';

@Controller('report')
//@UseGuards(AuthGuard('jwt'))
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':userId/:reportId')
  findWeeklyReport(@Param('userId') useId: number, @Param('reportId') reportId: number) {
    return this.reportService.findWeeklyReport(useId, reportId);
  }
  @Get(':userId/:projectId')
  findWeeklyReportsByProjectId(@Param('userId') useId: number, @Param('projectId') projectId: number) {
    return this.reportService.findWeeklyReportsByProjectId(useId, projectId)
  }
  @Get(':userId/trend/:projectId')
  findReportTrend(@Param('userId') useId: number, @Param('projectId') projectId: number) {
    return this.reportService.findReportTrend(useId, projectId);
  }
  // @Get(':userId/trend/:projectId')
  // findAdviceForReportTrend(@Param('userId') useId: number, @Param('projectId') projectId: number) {
  //   return this.reportService.findAdviceForReportTrend(useId, projectId);
  // }
  @Post(':report-trend')
  findAdviceForReportTrend(@Body() adviceRequest: AdviceRequest){
    return this.reportService.findAdviceForReportTrend(adviceRequest);
  }
  @Post()
  createWeeklyReports() {
    this.reportService.createWeeklyReport();
  }
}