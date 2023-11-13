/* eslint-disable prettier/prettier */
import { ICommand, ICommandHandler } from '@nestjs/cqrs';
export class DeleteApplicationCommand implements ICommand {
  constructor(public readonly id: string) {}
}


export class DeleteApplicationHandler implements ICommandHandler<DeleteApplicationCommand, void>{
    execute(command: DeleteApplicationCommand): Promise<void> {
        throw new Error('Method not implemented.');
    }
}