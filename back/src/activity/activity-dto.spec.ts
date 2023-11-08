import { CreateActivityRequest, UpdateActivityRequest, DeleteActivityRequest } from './activity-dto';


describe('CreateActivityRequest', () => {
  it('should be defined', () => {
    expect(new CreateActivityRequest()).toBeDefined();
  });
});

describe('UpdateActivityRequest', () => {
  it('should be defined', () => {
    expect(new UpdateActivityRequest()).toBeDefined();
  });
});

describe('DeleteActivityRequest', () => {
  it('should be defined', () => {
    expect(new DeleteActivityRequest()).toBeDefined();
  });
});