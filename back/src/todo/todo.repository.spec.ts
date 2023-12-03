import { getCustomRepository } from "typeorm";
import { TodoRepository } from './todo.repository';

describe('TodoRepository', () => {
  let todoRepository;

  beforeEach(() => {
    todoRepository = getCustomRepository(TodoRepository);
  });

  it('should be defined', () => {
    expect(todoRepository).toBeDefined();
  });
});
