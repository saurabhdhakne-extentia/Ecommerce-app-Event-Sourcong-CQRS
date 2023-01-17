import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus } from "@nestjs/cqrs";
import { User } from "src/users/entities/user";
import { UserRepository } from "../../repository/user.repository";
import { AddUserCommand } from "../impl/add-user.command";
import * as uuid from 'uuid';
import { UserAddedEvent } from "src/users/events/user-added.event";
import { UsersRepositoryToken } from "src/users/users-repository.token";

@CommandHandler(AddUserCommand)
export class AddUserHandler {
    constructor(
        @Inject(UsersRepositoryToken)
        private readonly repository: UserRepository,
        private readonly eventBus: EventBus
    ) { }

    async execute(command: AddUserCommand): Promise<string> {
        const id = uuid.v4();
        const user = new User(id, command.fname, command.email, command.contact);
        await this.repository.save(user);
        this.eventBus.publish(new UserAddedEvent(id, command.fname, command.email, command.contact));
        return id;
    }
}
