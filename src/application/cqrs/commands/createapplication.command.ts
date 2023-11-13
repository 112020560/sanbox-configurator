/* eslint-disable prettier/prettier */
import { ICommand, ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { ApplicationDto } from "src/application/dtos/createapplication.dto";
import { ApplicationRepository } from '../../../infrastructure/repositories/application.service';

export class CreateApplicationCommand implements ICommand {
    constructor(public readonly dto: ApplicationDto) { }
}

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand, void>{
    constructor(private readonly repository: ApplicationRepository) { }
    async execute(command: CreateApplicationCommand): Promise<void> {
       await this.repository.creatApplication(command.dto);
    }
}
