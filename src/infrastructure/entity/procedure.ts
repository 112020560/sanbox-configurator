/* eslint-disable prettier/prettier */
import { Column } from 'typeorm';

export class Procedure {
  @Column()
  Procedure: string;
  @Column()
  ProcedureKey: string;
  @Column()
  Parameters: string[];
  @Column()
  Active: boolean;
  @Column()
  Trace: boolean;

  constructor(Procedure: string, ProcedureKey: string,Paramters: string[], Active: boolean, Trace: boolean) {
    this.Procedure = Procedure;
    this.ProcedureKey = ProcedureKey;
    this.Parameters = Paramters;
    this.Active = Active;
    this.Trace = Trace;
  }
}
