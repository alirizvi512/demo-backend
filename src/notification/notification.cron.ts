import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from './notification.service';

@Injectable()
export class TasksService {
    public constructor(public readonly notificationService: NotificationService) {

    }
    private readonly logger = new Logger(TasksService.name);

    @Cron('* * * * * *')
    async handleCron() {
        this.logger.debug('Called when the current second is 1');
        await this.notificationService.findNotificationByScheduleDate(new Date());
        this.logger.debug('Database Call');
    }
}