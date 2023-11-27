import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // .env
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { DirectionModule } from './direction/direction.module';
import { ActivityModule } from './activity/activity.module';
import { PostModule } from './post/post.module';
import { ReportModule } from './report/report.module';
import { ConsultingModule } from './consulting/consulting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
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
