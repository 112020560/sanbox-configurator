/* eslint-disable prettier/prettier */
import { ApplicationByEnvironmentHandler } from 'src/application/cqrs/queries/applicationbyenv.query';
import { GetAllApplicationHandler } from './allapplication.query';
import { ApplicationByNameHandler } from './application.query';
import { ApplicationEndpointsHandler } from './applicationendpoint.query';
import { ApplicationKeyHandler } from './applicationkey.query';

export const queries = [
    ApplicationByNameHandler, 
    ApplicationKeyHandler, 
    ApplicationByEnvironmentHandler, 
    GetAllApplicationHandler,
    ApplicationEndpointsHandler];
