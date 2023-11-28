// import { Test, TestingModule } from '@nestjs/testing';
// import { ReportService } from './report.service';
// import { TodoService } from '../todo/todo.service';
// import { CreateTodoRequest } from '../todo/todo.dto';

// describe('ReportService', () => {
//   let service: ReportService;
//   let todoService: TodoService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ReportService, TodoService],
//     }).compile();

//     service = module.get<ReportService>(ReportService);
//     todoService = module.get<TodoService>(TodoService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   function createTodoForWeek(todoService: TodoService){
//     for (let i = 0; i < 7; i++) {
//       const todo = new CreateTodoRequest();
//       let startTime = new Date();
//       startTime.setDate(startTime.getDate() - i);
//       let endTime = new Date(todo.startTime);
//       endTime.setHours(endTime.getHours() + 1);
//       todo.startTime = startTime.toString();
//       todo.endTime = endTime.toString();
//       todo.todoName = `todo ${i + 1}`;
//       todo.success = true;
  
//       todoService.createTodo(todo);
//     }
//   }
//   describe('findWeeklyReport', () => {
//     it('should return report for the past week', () => {
//       createTodoForWeek(todoService);

//       const report = service.findWeeklyReport(1);
//       expect(report).toBeDefined();
//       expect(report.totalTime).toBe(7 * 60 * 60 * 1000);
//       expect(report.successTodo).toBe(7);
//     });
//   });
// });


