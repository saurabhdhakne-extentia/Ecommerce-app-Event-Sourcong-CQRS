import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DatabaseV1 } from "src/dbname.constant";
import { Repository } from "typeorm";
import { UserInputDto } from "../dtos/user-input.dto";
import { User } from "../entities/user";
import { UserRepository } from "./user.repository";

@Injectable()
export class TypeormUserRepository implements UserRepository {

    constructor(
        @InjectRepository(User, DatabaseV1)
        private readonly repository: Repository<User>
    ) { }

    async save(user: UserInputDto): Promise<void> {
        await this.repository.save(user)
    }
}
