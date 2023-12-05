import { Report } from './report.entity';
import { TodoService } from '../todo/todo.service';
import { ReportTrend } from './report.dto';
import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: ReportRepository,
  
    private readonly todoService: TodoService
  ) {}

  async findAllReport(userId: number): Promise<Report[]> {
    return await this.reportRepository.findAllReport(userId);
  }
  async findWeeklyReport(userId: number, reportId: number): Promise<Report> {
    const report = await this.reportRepository.findWeeklyReport(userId, reportId);
    return report;
  }
  async findWeeklyReportsByProjectId(userId: number, projectId: number): Promise<Report[]> {
    return await this.reportRepository.findWeeklyReportsByProjectId(userId, projectId);
  }
  async findReportTrend(userId: number, projectId: number): Promise<ReportTrend> {
    const reportTrend = new ReportTrend();
    const weeklyReportsByProjectId = await this.findWeeklyReportsByProjectId(userId, projectId);
    let totalTime = 0;
    let totalSuccessTodo = 0;
    reportTrend.totalTimeTrend = [];
    reportTrend.successTodoTrend = [];

    weeklyReportsByProjectId.forEach((weeklyReport) => {
      reportTrend.totalTimeTrend.push(weeklyReport.weeklyTotalTime);
      reportTrend.successTodoTrend.push(weeklyReport.successTodo);
      totalTime += weeklyReport.weeklyTotalTime;
      totalSuccessTodo += weeklyReport.successTodo;
    });
    return reportTrend;
  }
  @Cron('0 0 * * 1')
  async createWeeklyReport() {
    const todos = await this.todoService.findAllTodosByAllUsers();
    const projectStats = {};

    for (const todo of todos) {
      const projectId = todo.project.projectId;
      const userId = todo.project.user.userId;
      
      if (!projectStats[projectId]) {
        projectStats[projectId] = {totalTime: 0, successCount: 0, userId: userId};
      }

      projectStats[projectId].totalTime += todo.todoTotalTime;
      if (todo.success) {
        projectStats[projectId].successCount++;
      }
    }
    
    for (const key of Object.keys(projectStats)) {
      const projectId = Number(key);
      const pastReports = await this.findWeeklyReportsByProjectId(projectStats[projectId].useId, projectId);
      const week = pastReports.length > 0 ? pastReports[pastReports.length - 1].reportWeek + 1 : 1;
      let pastTotalTime = 0;
      
      pastReports.forEach(pastReport => {
        pastTotalTime += pastReport.weeklyTotalTime;
      });
      const weeklyTotalTime = projectStats[projectId].totalTime - pastTotalTime;

      const newReport = await this.createReport();
      newReport.project = { projectId } as any; 
      newReport.reportWeek = week;
      newReport.weeklyTotalTime = weeklyTotalTime;
      newReport.successTodo = projectStats[projectId].successCount;

      this.saveReport(newReport);
    }
  }
  async createReport(): Promise<Report> {
    return await this.createReport();
  }
  async saveReport(report: Report) {
    return this.reportRepository.save(report);
  }
}