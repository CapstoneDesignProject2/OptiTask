import { Module } from '@nestjs/common';
// import { TodoController } from './todo.controller';
// import { TodoService } from './todo.service';
import { Report } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
    // controllers: [TodoController],
    // providers: [TodoService],
})
export class ReportModule {}
