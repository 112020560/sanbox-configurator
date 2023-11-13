/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Version,
    HttpCode,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateApplicationCommand } from 'src/application/cqrs/commands/createapplication.command';
import { UpdateApplicationCommand } from 'src/application/cqrs/commands/updateapplication.command';
import { GetAllApplicationQuery } from 'src/application/cqrs/queries/allapplication.query';
import { ApplicationByEnvironmentQuery } from 'src/application/cqrs/queries/applicationbyenv.query';
import { ApplicationEndpointsQuery } from 'src/application/cqrs/queries/applicationendpoint.query';
import { ApplicationKeyQuery } from 'src/application/cqrs/queries/applicationkey.query';
import { ApplicationDto } from 'src/application/dtos/createapplication.dto';
import { AppliclationKeyModel } from 'src/domain/models/applicationkey.model';
import { ApplicationByNameAquery } from '../application/cqrs/queries/application.query';
import { Application } from '../infrastructure/entity/application.entity';

@ApiTags('application')
@Controller('application')
export class ApplicationController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) { }

    @Version('1')
    @Get()
    getAllApplication() {
        return this.queryBus.execute(new GetAllApplicationQuery());
    }

    // findOne(@Param('id') id: string):  ClassName_singularDto {

    @Version('1')
    @Get(':id')
    async getApplicationByName(@Param('id') id: string): Promise<Application> {
        return this.queryBus.execute(new ApplicationByNameAquery(id));
    }

    @Version('1')
    @Get(':tenant/getappkey/:app/:country')
    async getApplicationkey(@Param('tenant') tenant: string,
        @Param('app') app: number,
        @Param('country') country: number): Promise<AppliclationKeyModel> {
        return this.queryBus.execute(new ApplicationKeyQuery({ tenant: tenant, applicationCode: app, countryCode: country }));
    }

    @Version('1')
    @Get('environment/:env')
    async getApplicationByEnv(@Param('env') env: string): Promise<AppliclationKeyModel> {
        return this.queryBus.execute(new ApplicationByEnvironmentQuery({ environment: env }));
    }

    @Version('1')
    @Get('configurationendpoint/:appname')
    async getApplicationEndpoints(@Param('appname') appname: string): Promise<AppliclationKeyModel> {
        return this.queryBus.execute(new ApplicationEndpointsQuery({ applicationName: appname }));
    }

    @Version('1')
    @Post()
    @HttpCode(201)
    createApplication(@Body() applicationDto: ApplicationDto) {
        this.commandBus.execute(new CreateApplicationCommand(applicationDto));
    }

    @Put(':id')
    @HttpCode(200)
    updateApplication(@Body() applicationDto: ApplicationDto, @Param('id') id: string) {
        this.commandBus.execute(new UpdateApplicationCommand(id, applicationDto));
    }

    @Put('clone/:id')
    @HttpCode(200)
    cloneApplication(@Body() applicationDto: ApplicationDto, @Param('id') id: string) {
        this.commandBus.execute(new UpdateApplicationCommand(id, applicationDto));
    }

    //   /**
    //    * Delete className_singular
    //    * @param id
    //    */
    //   @Delete()
    //   deleteClassName_singular(@Param('id') id: string) {
    //     this.classNameService.deleteClassName_singular(id);
    //   }
}
