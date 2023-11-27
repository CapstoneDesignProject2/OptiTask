import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // .env
import { UserModule } from './user/user.module';
import { DirectionModule } from './direction/direction.module';
import { ActivityModule } from './activity/activity.module';
import { PostModule } from './post/post.module';
import { ReportModule } from './report/report.module';
import { ConsultingModule } from './consulting/consulting.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
    }),
    UserModule,
    DirectionModule,
    ActivityModule,
    PostModule,
    ReportModule,
    ConsultingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
