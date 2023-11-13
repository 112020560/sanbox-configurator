/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Application } from '../entity/application.entity';
import { AES, enc } from 'crypto-js';
import { Tenant } from '../entity/tenant.entity';
import { AppliclationKeyModel } from 'src/domain/models/applicationkey.model';
import { CommonQueryDto } from 'src/application/dtos/application.dto';
import { ObjectId } from 'mongodb'
import { ApplicationDto } from 'src/application/dtos/createapplication.dto';
import { ConnectionString } from '../entity/conection';
import { Procedure } from '../entity/procedure';
import { ExtentedProperty } from '../entity/extented';
import { classToPlain, instanceToPlain, plainToClass } from 'class-transformer';
import { CloneAppDto } from 'src/application/dtos/cloneapplication.dto';

@Injectable()
export class ApplicationRepository {
    constructor(
        @InjectRepository(Application)
        private repository: MongoRepository<Application>,

        @InjectRepository(Tenant)
        private tenantRepository: MongoRepository<Tenant>,

    ) {

    }

    public async getAllAplication(): Promise<Application[]> {
        return await this.repository.find({ order: { id: 'ASC' } });
      }

    public async getApplicationByName(applicationId: string) {
        console.log(process.env.SECRETE_KEY);
        const data = await this.repository.findOne({ where: { ApplicationId: applicationId }, order: { id: 'DESC' } });
        //console.log(data);
        data.Connections.forEach(conn => {
            conn.Password = AES.decrypt(conn.Password, process.env.SECRETE_KEY).toString(enc.Utf8);
        });
        return data;
    }

    public async getApplicationKey(appDto: CommonQueryDto): Promise<AppliclationKeyModel> {
        const application = await this.repository.findOne({ where: { ApplicationCode: appDto.applicationCode } });
        if (application) {
            if (application.Country.find(() => appDto.countryCode)) {
                return {
                    ApplicationKey: application.ApplicationId
                };
            } else {
                throw new HttpException(`Application ${application.ApplicationId} no existe para el Country ${appDto.countryCode}`, HttpStatus.NOT_FOUND);
            }
        } else {
            throw new HttpException(`Application ${application.ApplicationId} no existe`, HttpStatus.NOT_FOUND);
        }
    }

    public async getApplicationByEnvironment(environmentId: string) {
        const tenants = await this.tenantRepository.find({ where: { EnvironmentId: environmentId } });
        if (tenants) {
            const applications = [];
            for (let index = 0; index < tenants.length; index++) {
                const tenant = tenants[index];
                for (let index = 0; index < tenant.ApplicationId.length; index++) {
                    const applicationId = tenant.ApplicationId[index];
                    const appresp = await this.repository.findOne({ where: { ApplicationId: applicationId } });
                    applications.push(appresp);
                }
            }
            return applications;
        
        } else {
            throw new HttpException(`No existe ningin tenant asociado al Environment: ${environmentId}`, HttpStatus.NOT_FOUND);
        }
    }

    public async creatApplication(applicationDto: ApplicationDto): Promise<void> {
        applicationDto.Connections.forEach(connection => {
            const encrypt_password = connection.Password != null ? AES.encrypt(connection.Password, process.env.SECRETE_KEY).toString() : null
            console.log('encrypt_password', encrypt_password);
            connection.Password = encrypt_password;
        });
        const inserData = this.toModel(applicationDto)
        console.log(inserData);
        await this.repository.save(inserData);
      }

      public async updateApplication(appid: string, applicationDto: ApplicationDto): Promise<void> {
        applicationDto.Connections.forEach(connection => {
            const encrypt_password = connection.Password != null ? AES.encrypt(connection.Password, process.env.SECRETE_KEY).toString() : null
            console.log('encrypt_password', encrypt_password);
            connection.Password = encrypt_password;
        });
        const updateData: Application = this.toModel(applicationDto)
        await this.repository.update(new ObjectId(appid), updateData);
      }

      public async cloneApp(dto: CloneAppDto) {
        const app = await this.repository.findOne({ where: { ApplicationId: dto.sourceAppId } });
        if (app) {
          const newapp: Application = { ...app };
          newapp.ApplicationId = dto.targetAppId;
          newapp.ApplicationName = dto.targetAppId;
          newapp.Description = dto.description;
          newapp.ApplicationCode = dto.applicationCode;
          newapp.Country = [dto.applicationCountry];
    
          delete newapp.id;
    
          await this.repository.insert(newapp);
        }
      }

      public async deleteApplication(applicationId: string) {
        const tenants = await this.tenantRepository.find({ where: { ApplicationId: applicationId } });
        if (tenants && tenants.length > 0) {
          throw Error(`No se puede eliminar el applicativo ${applicationId} ya que se encuenta configurado en los tenants ${tenants.join()}`);
        }
        const app = await this.repository.findOne({ where: { ApplicationId: applicationId } });
        await this.repository.remove(app);
      }

      /**
       *Metodo encargado de transforma el Dto en Entidad
       *
       * @private
       * @param {ApplicationDto} applicationDto
       * @return {*}  {Application}
       * @memberof ApplicationRepository
       */
      private toModel(applicationDto: ApplicationDto ): Application {
        const data = instanceToPlain(applicationDto);
        return plainToClass(Application, data);
      }
}
