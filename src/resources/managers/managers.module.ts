import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Manager, ManagerSchema } from './entities/manager.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from '../notes/entities/note.entity';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService],
  imports: [
    MongooseModule.forFeature([
      {name: Manager.name, schema: ManagerSchema },
      {name: Note.name, schema: NoteSchema }
    ])
  ]
})
export class ManagersModule {}
