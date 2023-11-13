/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from '../entity/tenant.entity';
import { MongoRepository } from 'typeorm';
import { ApplicationEndpointMode } from 'src/domain/models/appendpoint.model';

@Injectable()
export class ConfigurationEndpointRepository {
    constructor(
        @InjectRepository(Tenant)
        private tenantRepository: MongoRepository<Tenant>,

    ) {}

    public async getConfigurationUrlByEnvApp(applicationid: string): Promise<ApplicationEndpointMode[]> {
        console.log(applicationid);
        const tenants = await this.tenantRepository.find({ where: { ApplicationId: applicationid } });
        if (tenants) {
          const responseUrl: ApplicationEndpointMode[] = [];
          tenants.forEach(tenat => {
            responseUrl.push({
              Environmet: tenat.EnvironmentId,
              configurationUrl: `${process.env.PUBLIC_BASE_URL}/api/${tenat.id}/v1`,
              Type: 'Public'
            });
            responseUrl.push({
                Environmet: tenat.EnvironmentId,
                configurationUrl: `${process.env.INTERNAL_BASE_URL}/api/${tenat.id}/v1`,
                Type: 'Internal'
              });
              responseUrl.push({
                Environmet: tenat.EnvironmentId,
                configurationUrl: `${process.env.CLUSTER_BASE_URL}/api/${tenat.id}/v1`,
                Type: 'Aks-Cluster'
              });
          });
          return responseUrl;
        } else {
          return [];
        }
      }
}
