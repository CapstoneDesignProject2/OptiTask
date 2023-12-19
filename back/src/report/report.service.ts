import { Report } from './report.entity';
import { TodoService } from '../todo/todo.service';
import { ReportTrend } from './report.dto';
import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportRepository } from './report.repository';
import { OpenAI } from "openai";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReportService {
  private openai: OpenAI;

  constructor(
    private readonly reportRepository: ReportRepository,
  
    private readonly todoService: TodoService,
    private readonly configService: ConfigService
  ) {
    this.openai = new OpenAI({
      apiKey : this.configService.get<string>('OPENAI_API_KEY'),
      organization: this.configService.get<string>('OPENAI_ORG_ID')
    });
  }

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
      //reportTrend.reportWeeks.push(weeklyReport.reportWeek);
      reportTrend.totalTimeTrend.push(weeklyReport.weeklyTotalTime);
      reportTrend.successTodoTrend.push(weeklyReport.successTodo);
      totalTime += weeklyReport.weeklyTotalTime;
      totalSuccessTodo += weeklyReport.successTodo;
    });

    reportTrend.totalTime = totalTime;
    reportTrend.totalSucessTodo = totalSuccessTodo;

    return reportTrend;
  }
  async findAdviceForReportTrend(userId: number, projectId: number) {
    const reportTrend = await this.findReportTrend(userId, projectId);
    const system_prompt = " 주어진 기록을 참고해서 지금까지의 프로젝트 상황을 유추하고 앞으로 개선할 점을 지적하세요";
    let user_prompt = "";
    const system = "user";

    for(let i = 0; i < reportTrend.reportWeeks.length; i++) {
      user_prompt += `${reportTrend.reportWeeks[i]}주차: ${reportTrend.totalTimeTrend[i]}분 수행, todo ${reportTrend.successTodoTrend[i]}개 완료, `;
    }
    user_prompt += `총 ${reportTrend.totalTime}분 수행, todo ${reportTrend.totalSucessTodo}개 완료`;
    
    const gptResponse = await this.openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: system_prompt
        },
        {
          role: "user",
          content: user_prompt
        }
      ],
      model: 'gpt-3.5-turbo',
    });
    return gptResponse.choices[0].message.content;
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
    return await this.reportRepository.createReport();
  }
  async saveReport(report: Report) {
    return this.reportRepository.saveReport(report);
  }
}