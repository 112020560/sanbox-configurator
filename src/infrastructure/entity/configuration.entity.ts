import { Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity('Configuration')
export class ConfigurationSetting {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  Tenant: string;
  @Column()
  ApplicationId: string;
  @Column()
  Configuration: ObjectId;
}
