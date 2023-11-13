/* eslint-disable prettier/prettier */
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonQueryDto } from 'src/application/dtos/application.dto';
import { AppliclationKeyModel } from 'src/domain/models/applicationkey.model';
import { ApplicationRepository } from '../../../infrastructure/repositories/application.service';
export class ApplicationKeyQuery implements IQuery {
    constructor(public readonly dto: CommonQueryDto) { }
}


@QueryHandler(ApplicationKeyQuery)
export class ApplicationKeyHandler implements IQueryHandler<ApplicationKeyQuery, AppliclationKeyModel>{
    constructor(private readonly repository: ApplicationRepository) { }

    async execute(query: ApplicationKeyQuery): Promise<AppliclationKeyModel> {
        return await this.repository.getApplicationKey(query.dto);
    }
}
