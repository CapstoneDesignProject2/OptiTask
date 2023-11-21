import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  //주간 보고서 조회 (보고서) GET
  @Get(':pastWeeksAgo')
  findWeeklyReport(@Param('pastWeeksAgo') pastWeeksAgo: number) {
    return this.reportService.findWeeklyReport(pastWeeksAgo);
  }
}
