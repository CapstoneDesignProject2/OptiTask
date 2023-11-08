export class CreateActivityRequest {
  startTime: Date;
  endTime: Date;
  content: string;
  tag: string;
  success: string[];
}

export class UpdateActivityRequest {
  id: number;
  content: string;
  tag: string;
  sucess: string[];
}

export class DeleteActivityRequest {
  id: number;
}
