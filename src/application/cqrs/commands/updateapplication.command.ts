/* eslint-disable prettier/prettier */
import { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ApplicationDto } from 'src/application/dtos/createapplication.dto';
import { ApplicationRepository } from '../../../infrastructure/repositories/application.service';
export class UpdateApplicationCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly dto: ApplicationDto) { }
}


export class UpdateApplicationHandler implements ICommandHandler<UpdateApplicationCommand, void> {

    constructor(private readonly repository: ApplicationRepository) { }
    
    async execute(command: UpdateApplicationCommand): Promise<void> {
        await this.repository.updateApplication(command.id, command.dto);
    }
} 