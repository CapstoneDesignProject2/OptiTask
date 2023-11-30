import { StartTodoRequest } from './todo.dto';

describe('StartTodoRequest', () => {
  it('should be defined', () => {
    expect(new StartTodoRequest()).toBeDefined();
  });
});
