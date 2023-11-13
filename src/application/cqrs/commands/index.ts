/* eslint-disable prettier/prettier */
import { CreateApplicationHandler } from './createapplication.command';
import { UpdateApplicationHandler } from './updateapplication.command';

export const commandHandler = [CreateApplicationHandler, UpdateApplicationHandler];
