import { getCustomRepository } from 'typeorm';
import { ProjectRepository } from './project.repository';

describe('ReportRepository', () => {
  let projectRepository;

  beforeEach(() => {
    projectRepository = getCustomRepository(ProjectRepository);

  });
  it('should be defined', () => {
    expect(projectRepository).toBeDefined();
  });
});
