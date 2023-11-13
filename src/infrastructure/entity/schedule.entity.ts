import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('Schedule')
export class ScheduleConfig {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  ServiceName: string;
  @Column()
  Countries: any[];
  @Column()
  Tenant: string;
}
