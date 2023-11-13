import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'request' })
export class Solicitud {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ name: 'request_user' })
  requestUser: string;

  @Column({ name: 'source_env' })
  sourceEnvironment: string;

  @Column({ name: 'source_app' })
  sourceApplicationId: string[];

  @Column({ name: 'source_tenant' })
  sourceTenantId: string;

  @Column({ name: 'source_config' })
  sourceConfigurationId: string;

  @Column({ name: 'source_schedule' })
  sourceScheduleId: string;

  @Column({ name: 'target_env' })
  targetEnvironmetId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ name: 'user_approves' })
  userApproves: string;

  @Column()
  status: string;
}
