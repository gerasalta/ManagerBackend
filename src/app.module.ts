import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './resources/clients/clients.module';
import { CommonModule } from './common/common.module';
import { NotesModule } from './resources/notes/notes.module';
import { OrdersModule } from './resources/orders/orders.module';
import { AdvancesModule } from './resources/advances/advances.module';
import { ManagersModule } from './resources/managers/managers.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { LoginModule } from './resources/auth/login/login.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    ClientsModule,
    CommonModule,
    NotesModule,
    OrdersModule,
    AdvancesModule,
    ManagersModule,
    TasksModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 

  constructor(){}
  
}
