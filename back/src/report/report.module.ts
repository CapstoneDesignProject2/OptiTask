import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Report } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from 'src/todo/todo.module';

@Module({
    imports: [TypeOrmModule.forFeature([Report]), TodoModule],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {}