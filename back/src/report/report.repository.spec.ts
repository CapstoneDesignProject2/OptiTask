import { getCustomRepository } from 'typeorm';
import { ReportRepository } from './report.repository';

describe('ReportRepository', () => {
  let reportRepository;

  beforeEach(() => {
    reportRepository = getCustomRepository(ReportRepository);

  });
  it('should be defined', () => {
    expect(reportRepository).toBeDefined();
  });
});
