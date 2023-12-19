import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule} from '@nestjs/config'; // .env
import { typeOrmModule } from './typeorm.module';
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { ProjectModule } from './project/project.module';
import { TodoModule } from './todo/todo.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // .env
    TypeOrmModule.forRootAsync(typeOrmModule),
    UserModule,
    AuthModule,
    ReportModule,
    ProjectModule,
    TodoModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
