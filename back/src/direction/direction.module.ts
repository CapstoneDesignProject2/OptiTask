import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // .env
import { DirectionController } from './direction.controller';
import { DirectionService } from './direction.service';

@Module({
  imports: [ConfigModule],
  controllers: [DirectionController],
  providers: [
    DirectionService,
    {
      provide: 'CONFIG',
      useValue: new ConfigService(),
    },
  ],
})
export class DirectionModule {}
