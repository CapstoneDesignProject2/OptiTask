import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // .env
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { ProjectModule } from './project/project.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env
    UserModule,
    ReportModule,
    ProjectModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
