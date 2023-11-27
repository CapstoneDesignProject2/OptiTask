import { Injectable } from '@nestjs/common';
import { Report } from './report-entity';
import { TodoService } from '../todo/todo.service';
import { ReportTrend } from './report-dto';

@Injectable()
export class ReportService {
  constructor(private readonly todoService: TodoService) {}
  private reports: Report[] = [];

  findAllReport(): Report[] {
    return this.reports;
  }
  findWeeklyReport(pastWeeksAgo: number): Report {
    const report = new Report();
    let todos = [];
    report.totalTime = 0;
    //report.todoTimes = [];
    report.successTodo = [];
    todos = this.todoService.findWeeklyTodo(pastWeeksAgo);

    todos.forEach((todo) => {
      report.totalTime += todo.endTime.getTime() - todo.startTime.getTime();
      //report.tagTimes[activity.tag] = (report.tagTimes[activity.tag] || 0) + (activity.endTime.getTime() - activity.startTime.getTime());
      report.successTodo += todo.success;
    });
    return report;
  }
  findReportTrend(): ReportTrend {
    const reportTrend = new ReportTrend();
    let Allreport = [];
    reportTrend.totalTimeTrend = [];
    //reportTrend.todoTimesTrend = {};
    reportTrend.successTodoTrend = [];
    Allreport = this.findAllReport();

    Allreport.forEach((report) => {
      reportTrend.totalTimeTrend.push(report.totalTime);
      //reportTrend.todoTimesTrend.push(report.todoTimes);
      reportTrend.successTodoTrend.push(report.successTodo);
    });
    return reportTrend;
  }
}
