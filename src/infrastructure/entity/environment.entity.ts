import { Column, Entity, ObjectId, ObjectIdColumn, Unique } from 'typeorm';
import { DataBaseIntance } from './dbintance';
import { EnvUrls } from './endpoints';

@Entity('Environment')
@Unique(['EnvironmetId'])
export class DataBaseEnvironment {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  EnvironmetId: string;
  @Column()
  Name: string;
  @Column()
  Description: string;
  @Column()
  IsEnable: boolean;
  @Column((type) => EnvUrls)
  EndPoints: EnvUrls[];
  @Column((type) => DataBaseIntance)
  Instances: DataBaseIntance[];
}
