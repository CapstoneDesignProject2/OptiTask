import { CreateProjectRequest, UpdateProjectRequest, DeleteProejctRequest } from './project.dto';

describe('ProjectDto', () => {
  it('should be defined', () => {
    expect(new CreateProjectRequest()).toBeDefined();
  });
});
