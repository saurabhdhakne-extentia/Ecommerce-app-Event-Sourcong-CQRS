import { Body, Controller, Post, Req, HttpException, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { QueryBus } from '@nestjs/cqrs/dist';
import { UserDto } from './dtos/user.dto';
import { UserInputDto } from './dtos/user-input.dto';
import { Request } from 'express';
import { validate as uuidValidate } from 'uuid';
import { AddUserCommand } from './commands/impl/add-user.command';

@Controller('users')
export class UsersController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post()
    async createWallet(
        @Body() payload: UserInputDto,
        @Req() request: Request
    ): Promise<any> {
        const userId = request.header('H-User-Id');
        if (!uuidValidate(userId)) {
            throw new HttpException('User Id must be a valid uuid', HttpStatus.BAD_REQUEST);
        }
        const id: string = await this.commandBus.execute(new AddUserCommand(payload.fname, payload.email, payload.contact));
        return { id };
    }
}
