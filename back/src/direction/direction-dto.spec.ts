import { CreateTargetDto,
  UpdateTargetDto,
  CreateObstacleDto,
  UpdateObstacleDto,
  DeleteObstacleDto,
  CreateDailyHabitDto,
  UpdateDailyHabitDto,
  CreateCheckListDto,
  UpdateCheckListDto } from './direction-dto';

describe('CreateTargetDto', () => {
  it('should be defined', () => {
    expect(new CreateTargetDto()).toBeDefined();
  });
});

describe('UpdateTargetDto', () => {
  it('should be defined', () => {
    expect(new UpdateTargetDto()).toBeDefined();
  });
}); 

describe('CreateObstacleDto', () => {
  it('should be defined', () => {
    expect(new CreateObstacleDto()).toBeDefined();
  });
});

describe('UpdateObstacleDto', () => {
  it('should be defined', () => {
    expect(new UpdateObstacleDto()).toBeDefined();
  });
});

describe('DeleteObstacleDto', () => {
  it('should be defined', () => {
    expect(new DeleteObstacleDto()).toBeDefined();
  });
});

describe('CreateDailyHabitDto', () => {
  it('should be defined', () => {
    expect(new CreateDailyHabitDto()).toBeDefined();
  });
});

describe('UpdateDailyHabitDto', () => {
  it('should be defined', () => {
    expect(new UpdateDailyHabitDto()).toBeDefined();
  });
});

describe('CreateCheckListDto', () => {
  it('should be defined', () => {
    expect(new CreateCheckListDto()).toBeDefined();
  });
});

describe('UpdateCheckListDto', () => {
  it('should be defined', () => {
    expect(new UpdateCheckListDto()).toBeDefined();
  });
});