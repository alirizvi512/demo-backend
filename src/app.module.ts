import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './notification/notification.cron';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
