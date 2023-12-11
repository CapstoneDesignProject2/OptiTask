import { Repository } from "typeorm";
import { Project } from "./project.entity";

export class ProjectRepository extends Repository<Project> {

  async findAllProject(userId: number): Promise<Project[]> {
    return this.createQueryBuilder("project")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .getMany();
  }
  async findOneProject(userId: number, projectId: number): Promise<Project> {
    return this.createQueryBuilder("project")
        .innerJoinAndSelect("project.user", "user", "user.userId = :userId", { userId })
        .where("project.projectId = :projectId", { projectId })
        .getOne();
  }
  async saveProject(project: Project) {
    return this.save(project)
  }
  async createProject(userId: number): Promise<Project>  {
    const newProject = new Project();

    newProject.projectName = "emptyProject";
    newProject.deadline = null;
    newProject.user = { userId } as any; // work?
    
    return newProject;
  }
  async deleteOneProject(projectId: number) {
    return await this.delete(projectId);
  }
}
