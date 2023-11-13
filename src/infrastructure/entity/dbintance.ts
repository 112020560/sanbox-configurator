import { Column } from 'typeorm';

export class DataBaseIntance {
  @Column()
  Target: string;
  @Column()
  Value: string;
  @Column()
  Key?: string;
  constructor(Target: string, Value: string, Key?: string) {
    this.Target = Target;
    this.Value = Value;
    this.Key = Key;
  }
}
