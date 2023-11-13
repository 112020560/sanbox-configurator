/* eslint-disable prettier/prettier */
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApplicationEndpointMode } from 'src/domain/models/appendpoint.model';
import { ConfigurationEndpointRepository } from 'src/infrastructure/repositories/endpoints.service';
import { CommonQueryDto } from '../../dtos/application.dto';
export class ApplicationEndpointsQuery implements IQuery {
    constructor(public readonly dto: CommonQueryDto) { }
}


@QueryHandler(ApplicationEndpointsQuery)
export class ApplicationEndpointsHandler implements IQueryHandler<ApplicationEndpointsQuery, ApplicationEndpointMode[]>{
    constructor(private readonly repository: ConfigurationEndpointRepository) { }
    async execute(query: ApplicationEndpointsQuery): Promise<ApplicationEndpointMode[]> {
        return await this.repository.getConfigurationUrlByEnvApp(query.dto.applicationName);
    }
}
