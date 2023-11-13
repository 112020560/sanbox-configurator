/* eslint-disable prettier/prettier */
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Application } from '../../../infrastructure/entity/application.entity';
import { ApplicationRepository } from '../../../infrastructure/repositories/application.service';
export class GetAllApplicationQuery implements IQuery {}

@QueryHandler(GetAllApplicationQuery)
export class GetAllApplicationHandler
  implements IQueryHandler<GetAllApplicationQuery, Application[]>
{

    constructor(private readonly repositiry: ApplicationRepository){}

  async execute(query: GetAllApplicationQuery): Promise<Application[]> {
    return await this.repositiry.getAllAplication();
  }
}
