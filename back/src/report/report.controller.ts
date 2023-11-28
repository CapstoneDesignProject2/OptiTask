// import { Controller, Get, Param } from '@nestjs/common';
// import { ReportService } from './report.service';

// @Controller('report')
// export class ReportController {
//   constructor(private readonly reportService: ReportService) {}

//   @Get(':pastWeeksAgo')
//   findWeeklyReport(@Param('pastWeeksAgo') pastWeeksAgo: number) {
//     return this.reportService.findWeeklyReport(pastWeeksAgo);
//   }
//   @Get()
//   findReportTrend() {
//     return this.reportService.findReportTrend();
//   }
// }
