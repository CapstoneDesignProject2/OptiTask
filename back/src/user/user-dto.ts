import { IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(4, 20)
  readonly id: string;

  @IsString()
  @Length(6, 20)
  password: string;
}