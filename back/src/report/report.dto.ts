import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReportTrend {
  reportWeeks: number[];
  totalTimeTrend: number[];
  successTodoTrend: number[];
  totalTime: number;
  totalSucessTodo: number;
}
