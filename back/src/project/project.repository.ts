import { DataSource, Repository } from "typeorm";
import { Project } from "./project.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectRepository {
  private readonly projectRepository: Repository<Project>;
  constructor(private readonly dataSources: DataSource) {
    this.projectRepository = this.dataSources.getRepository(Project);
  }

  async findAllProject(userId: number): Promise<Project[]> {
    return this.projectRepository.createQueryBuilder("project")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .getMany();
  }
  async findOneProject(userId: number, projectId: number): Promise<Project> {
    return this.projectRepository.createQueryBuilder("project")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .where("project.projectId = :projectId", { projectId })
        .getOne();
  }
  async saveProject(project: Project) {
    return this.projectRepository.save(project)
  }
  async createProject(userId: number): Promise<Project>  {
    const newProject = new Project();

    newProject.projectName = "emptyProject";
    newProject.deadline = null;
    newProject.user = { userId } as any; // work?
    
    return newProject;
  }
  async deleteOneProject(projectId: number) {
    return await this.projectRepository.delete(projectId);
  }
}
