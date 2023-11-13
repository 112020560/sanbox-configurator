/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../entity/application.entity';
import { Tenant } from '../entity/tenant.entity';
import { DataBaseEnvironment } from '../entity/environment.entity';
import { ApplicationRepository } from './application.service';
import { ApplicationController } from 'src/controllers/application.controller';
import { queries } from 'src/application/cqrs/queries';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigurationEndpointRepository } from './endpoints.service';
import { commandHandler } from 'src/application/cqrs/commands';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Application, Tenant, DataBaseEnvironment]),
    ],
    controllers: [ApplicationController],
    providers: [ ApplicationRepository, ConfigurationEndpointRepository,...queries, ...commandHandler],
    exports:[ApplicationRepository]
})
export class RepositoryModule { }
