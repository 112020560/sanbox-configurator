/* eslint-disable prettier/prettier */
import { Entity, ObjectIdColumn, Column, Unique, ObjectId } from 'typeorm';
import { ConnectionString } from './conection';
import { ExtentedProperty } from './extented';
import { Procedure } from './procedure';

@Entity('Application')
@Unique(['ApplicationId'])
export class Application {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  ApplicationId: string;
  @Column()
  ApplicationCode:number;
  @Column()
  ApplicationName: string;
  @Column()
  Description: string;
  @Column()
  DbUserName: string;
  @Column()
  DbPassword: string;
  @Column()
  IsEnable: boolean;
  @Column()
  IsEditable: boolean;
  @Column()
  ReqAprove: boolean;
  @Column(type => ConnectionString)
  Connections: ConnectionString[];
  @Column()
  AllowProcedure: boolean;
  @Column(type => Procedure)
  Procedures: Procedure[];
  @Column(type => ExtentedProperty)
  ExtendedProperties: ExtentedProperty[]
  @Column()
  Country: number[]
}
