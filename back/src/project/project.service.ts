import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectRequest, UpdateProjectRequest, DeleteProejctRequest } from './project.dto';
import { TodoService } from '../todo/todo.service';
import { UsersService } from 'src/user/users.service';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    
    private readonly todoService: TodoService,
    private readonly usersService: UsersService) {}

  async findAllProject(userId: number): Promise<Project[]> {
    return await this.projectRepository.findAllProject(userId);
  }
  async findOneProject(userId: number, projectId): Promise<Project> {
    return await this.projectRepository.findOneProject(userId, projectId);
  }
  async createProject(createProjectRequest: CreateProjectRequest){
    const newProject = await this.projectRepository.createProject(createProjectRequest.userId);
    newProject.projectName = createProjectRequest.projectName;
    newProject.deadline = createProjectRequest.deadline;
    //newProject.user = await this.usersService.findOneByUserId(createProjectRequest.userId);
    this.projectRepository.saveProject(newProject);

    this.todoService.createTodoByProject(newProject, createProjectRequest.todoList);
  }
  async updateProject(updateProjectRequest: UpdateProjectRequest) {
    const updateProject = await this.projectRepository.findOneProject(updateProjectRequest.userId, updateProjectRequest.projectId);
    updateProject.projectName = updateProjectRequest.projectName;
    updateProject.deadline = updateProjectRequest.deadline;
    
    this.projectRepository.saveProject(updateProject);
  }
  deleteProject(deleteProejctRequest: DeleteProejctRequest) {
    this.projectRepository.deleteOneProject(deleteProejctRequest.projectId);
    this.todoService.deleteTodoByProject(deleteProejctRequest.projectId);
  }
}
