import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectRequest, UpdateProjectRequest, DeleteProejctRequest, FindAllProjectResponse, FindOneProjectResponse } from './project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':userId')
  async findAllProject(@Param('userId') userId: number) {
    return new FindAllProjectResponse(await this.projectService.findAllProject(userId));
  }
  @Get(':userId/:projectId')
  async findOneProject(@Param('userId') userId: number, @Param('projectId') projectId: number) {
    return new FindOneProjectResponse(await this.projectService.findOneProject(userId, projectId));
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
