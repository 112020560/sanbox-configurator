/* eslint-disable prettier/prettier */
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonQueryDto } from 'src/application/dtos/application.dto';
import { Application } from '../../../infrastructure/entity/application.entity';
import { ApplicationRepository } from '../../../infrastructure/repositories/application.service';
export class ApplicationByEnvironmentQuery implements IQuery {
    constructor(public readonly dto: CommonQueryDto) { }
}

@QueryHandler(ApplicationByEnvironmentQuery)
export class ApplicationByEnvironmentHandler implements IQueryHandler<ApplicationByEnvironmentQuery, Application[]>{
    constructor(private readonly repository: ApplicationRepository) { }
    async execute(query: ApplicationByEnvironmentQuery): Promise<Application[]> {
        return await this.repository.getApplicationByEnvironment(query.dto.environment);
    }
}