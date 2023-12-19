import { Request, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('report')
@UseGuards(AuthGuard('jwt'))
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':reportId')
  findWeeklyReport(@Request() req: any, @Param('reportId') reportId: number) {
    const userId = req.user.userId;
    return this.reportService.findWeeklyReport(userId, reportId);
  }
  @Get('/project/:projectId')
  findWeeklyReportsByProjectId(@Request() req: any, @Param('projectId') projectId: number) {
    const userId = req.user.userId;
    return this.reportService.findWeeklyReportsByProjectId(userId, projectId)
  }
  @Get('trend/:projectId')
  findReportTrend(@Request() req: any, @Param('projectId') projectId: number) {
    const userId = req.user.userId;
    return this.reportService.findReportTrend(userId, projectId);
  }
  @Get('trend/:projectId/advice')
  findAdviceForReportTrend(@Request() req: any, @Param('projectId') projectId: number) {
    const userId = req.user.userId;
    return this.reportService.findAdviceForReportTrend(userId, projectId);
  }
  @Post()
  createWeeklyReports() {
    this.reportService.createWeeklyReport();
  }
}