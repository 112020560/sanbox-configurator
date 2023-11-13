import { Column } from 'typeorm';

export class ExtentedProperty {
  @Column()
  Key00: string;
  @Column()
  Key01: string;
  @Column()
  Key02: string;
  @Column()
  Value00: any;
  @Column()
  Value01: any;
  @Column()
  Value02: any;
  @Column()
  NumericValue: number;
  @Column()
  Description: string;

  constructor(
    Key00: string,
    Key01: string,
    Key02: string,
    Value00: any,
    Value01: any,
    Value02: any,
    NumericValue: number,
    Description: string,
  ) {
    this.Key00 = Key00;
    this.Key01 = Key01;
    this.Key02 = Key02;
    this.Value00 = Value00;
    this.Value01 = Value01;
    this.Value02 = Value02;
    this.NumericValue = NumericValue;
    this.Description = Description;
  }
}
