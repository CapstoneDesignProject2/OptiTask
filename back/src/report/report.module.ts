import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TodoService } from 'src/todo/todo.service';

@Module({
  providers: [ReportService, TodoService],
  controllers: [ReportController]
})
export class ReportModule {}
