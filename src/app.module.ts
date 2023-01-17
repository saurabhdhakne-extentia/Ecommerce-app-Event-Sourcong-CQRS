import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseV1 } from './dbname.constant';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user';

@Module({
  imports: [TypeOrmModule.forRoot({
    name: DatabaseV1,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'toor',
    database: 'Estore404',
    entities: [User],
    synchronize: true,
  }), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
