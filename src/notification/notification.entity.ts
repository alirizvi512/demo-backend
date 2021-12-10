import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  body: string;

  @Column({ type: 'timestamp' })
  schedule: Date;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;
}