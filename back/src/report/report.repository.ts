import { Repository } from 'typeorm';
import { Report } from './report.entity';

export class ReportRepository extends Repository<Report> {

  async findAllReport(): Promise<Report[]> {
    return this.find();
  }
  async findWeeklyReportsByProjectId(projectId: number): Promise<Report[]> {
    return this.find({ where: { project: {projectId} } });
  }
  async findWeeklyReport(reportId: number): Promise<Report> {
    return this.findOne({ where: { reportId } });
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
