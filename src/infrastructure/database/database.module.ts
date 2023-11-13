/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      ssl: true,
      logging: ["query", "error"],
      logger: 'advanced-console',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
})
export class DataBaseModule {
  constructor() {
    console.log('inicio');
  }
}
