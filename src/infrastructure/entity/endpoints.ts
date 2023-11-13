import { Column } from 'typeorm';

export class EnvUrls {
  @Column()
  Key: string;
  @Column()
  Value: string;

  constructor(Key: string, Value: string) {
    this.Key = Key;
    this.Value = Value;
  }
}
