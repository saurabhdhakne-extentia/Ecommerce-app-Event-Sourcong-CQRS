import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseV1 } from 'src/dbname.constant';
import { AddUserHandler } from './commands/handler/add-user.handler';
import { User } from './entities/user';
import { TypeormUserRepository } from './repository/typeorm-user.repository';
import { UsersRepositoryToken } from './users-repository.token';
import { UsersController } from './users.controller';

const command = [AddUserHandler]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User], DatabaseV1)
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepositoryToken,
      useClass: TypeormUserRepository
    },
    ...command,
  ]
})
export class UsersModule { }
