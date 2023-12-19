import { DataSource, Repository } from 'typeorm';
import { Report } from './report.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportRepository {
  private readonly reportRepository: Repository<Report>;
  constructor(private readonly dataSources: DataSource) {
    this.reportRepository = this.dataSources.getRepository(Report);
  }

  async findAllReport(userId: number): Promise<Report[]> {
    return this.reportRepository.createQueryBuilder("report")
        .innerJoinAndSelect("report.project", "project")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .getMany();
  }
  async findWeeklyReportsByProjectId(userId: number, projectId: number): Promise<Report[]> {
    return this.reportRepository.createQueryBuilder("report")
        .innerJoinAndSelect("report.project", "project", "project.projectId = :projectId", { projectId })
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .getMany();
  }
  async findWeeklyReport(userId: number, reportId: number): Promise<Report> {
    return this.reportRepository.createQueryBuilder("report")
        .innerJoinAndSelect("report.project", "project")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .where("report.reportId = :reportId", { reportId })
        .getOne();
  }
  async createReport(): Promise<Report> {
    const newReport = new Report();
    newReport.project = null;
    newReport.reportWeek = 0;
    newReport.weeklyTotalTime = 0;
    newReport.successTodo = 0;
    return newReport;
  }
  async saveReport(report: Report) {
    return this.reportRepository.save(report);
  }
}
