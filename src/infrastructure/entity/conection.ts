/* eslint-disable prettier/prettier */
import { Column } from "typeorm";

export class ConnectionString {
  @Column()
  Type: string;
  @Column()
  ConnectionString?: string;
  @Column()
  ConnectionKey00: string;
  @Column()
  ConnectionKey01: string;
  @Column()
  ConnectionKey02: string;
  @Column()
  HostName?: string;
  @Column()
  UserName?: string;
  @Column()
  Password?: string;
  @Column()
  DataBase?: string;
  @Column()
  Port?: number;
  @Column()
  SSLMode?: string

  constructor(Type: string, ConnectionString: string, ConnectionKey00: string, ConnectionKey01: string, ConnectionKey02: string, HostName?: string, UserName?: string, Password?: string, DataBase?: string, Port?:number, SSLMode?: string) {
    this.Type = Type;
    this.ConnectionString = ConnectionString;
    this.ConnectionKey00 = ConnectionKey00;
    this.ConnectionKey01 = ConnectionKey01;
    this.ConnectionKey02 = ConnectionKey02;
    this.HostName = HostName;
    this.UserName = UserName;
    this.Password = Password;
    this.DataBase = DataBase;
    this.Port = Port;
    this.SSLMode = SSLMode;
  }
}
