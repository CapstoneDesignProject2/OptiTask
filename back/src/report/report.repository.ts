import { Repository } from 'typeorm';
import { Report } from './report.entity';

export class ReportRepository extends Repository<Report> {

  async findAllReport(userId: number): Promise<Report[]> {
    return this.find({ where: {project: {user: {userId: {userId}}}}});
  }
  async findWeeklyReportsByProjectId(userId: number, projectId: number): Promise<Report[]> {
    return this.find({ where: { project: {projectId: projectId, user: {userId: userId}} } });
  }
  async findWeeklyReport(userId: number, reportId: number): Promise<Report> {
    return this.findOne({ where: { reportId: reportId, project: {user: {userId: userId}} } });
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
    return this.save(report);
  }
}
