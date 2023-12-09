import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReportTrend {
  reportWeeks: number[];
  totalTimeTrend: number[];
  successTodoTrend: number[];
  totalTime: number;
  totalSucessTodo: number;
}
export class AdviceRequest {
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  reportWeeks: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  totalTimeTrend: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  successTodoTrend: number[];

  @IsNumber()
  totalTime: number;

  @IsNumber()
  totalSucessTodo: number;
}
