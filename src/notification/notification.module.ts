import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './notification.controller';
import { TasksService } from './notification.cron';
import { notificationProviders } from './notification.providers';
import { NotificationService } from './notification.service';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  controllers:[NotificationController],
  providers: [
    ...notificationProviders,
    NotificationService,
    TasksService
  ],
})
export class NotificationModule {}