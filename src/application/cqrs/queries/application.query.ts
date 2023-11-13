/* eslint-disable prettier/prettier */
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Application } from '../../../infrastructure/entity/application.entity';
import { ApplicationRepository } from '../../../infrastructure/repositories/application.service';

export class ApplicationByNameAquery implements IQuery {
    constructor(public readonly applicationName: string) { }
}

@QueryHandler(ApplicationByNameAquery)
export class ApplicationByNameHandler implements IQueryHandler<ApplicationByNameAquery, Application> {

    constructor(private readonly appRepository: ApplicationRepository) { }

    async execute(query: ApplicationByNameAquery): Promise<Application> {
        return await this.appRepository.getApplicationByName(query.applicationName);
    }
}