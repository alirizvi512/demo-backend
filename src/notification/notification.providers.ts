import { Connection } from 'typeorm';
import { Notification } from './notification.entity';

export const notificationProviders = [
  {
    provide: 'NOTIFICATION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Notification),
    inject: ['DATABASE_CONNECTION'],
  },
];