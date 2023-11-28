import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectRequest, UpdateProjectRequest, DeleteProejctRequest } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAllProject() {
    return this.projectService.findAllProject();
  }
  @Post()
  createProject(@Body() createProjectRequest: CreateProjectRequest) {
    return this.projectService.createProject(createProjectRequest);
  }
  @Patch()
  updateProject(@Body() updateProjectRequest: UpdateProjectRequest) {
    return this.projectService.updateProject(updateProjectRequest);
  }
  @Delete()
  deleteProject(@Body() deleteProjectRequest: DeleteProejctRequest) {
    return this.projectService.deleteProject(deleteProjectRequest);
  }
}
