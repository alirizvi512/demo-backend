import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateNotificationDto, UpdateNotificationDto } from './notification.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return await this.notificationRepository.create({ title: createNotificationDto.title, body: createNotificationDto.body, schedule: createNotificationDto.schedule });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<string> {
      const notificationObj = await this.notificationRepository.findOne({ id });
      if (notificationObj) {
          notificationObj.title = updateNotificationDto.title;
          notificationObj.body = updateNotificationDto.body;
          notificationObj.schedule = updateNotificationDto.schedule;

          await this.notificationRepository.save(notificationObj);
          return 'Updated';
      } else {
        return 'Notification not found';
      }
  }

  async findOne(id: number) : Promise<Notification> {
      return await this.notificationRepository.findOne({ id });
  }

  async findNotificationByScheduleDate(date) : Promise<Notification> {
    return await this.notificationRepository.findOne({ schedule: date });
  }

  async delete(id: number) : Promise<string> {
    const notificationObj = await this.notificationRepository.findOne({ id });
    if (notificationObj) {
      await this.notificationRepository.remove(notificationObj);
      return 'Deleted';
    } else {
        return 'Notification not found';
    }
  }
}