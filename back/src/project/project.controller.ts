import { Request, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectRequest, UpdateProjectRequest, DeleteProejctRequest, FindAllProjectResponse, FindOneProjectResponse } from './project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get('')
  async findAllProject(@Request() req: any) {
    const userId = req.user.userId;
    return new FindAllProjectResponse(await this.projectService.findAllProject(userId));
  }
  
  @Get(':projectId')
  async findOneProject(@Request() req: any, @Param('projectId') projectId: number) {
    const userId = req.user.userId;
    return new FindOneProjectResponse(await this.projectService.findOneProject(userId, projectId));
  }
  
  @Post()
  createProject(@Request() req: any, @Body() createProjectRequest: CreateProjectRequest) {
    createProjectRequest.userId = req.user.userId;
    return this.projectService.createProject(createProjectRequest);
  }
  
  @Patch()
  updateProject(@Request() req: any, @Body() updateProjectRequest: UpdateProjectRequest) {
    updateProjectRequest.userId = req.user.userId;
    return this.projectService.updateProject(updateProjectRequest);
  }
  
  @Delete()
  deleteProject(@Body() deleteProjectRequest: DeleteProejctRequest) {
    return this.projectService.deleteProject(deleteProjectRequest);
  }
}
