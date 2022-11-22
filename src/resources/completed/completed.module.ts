import { Module } from '@nestjs/common';
import { CompletedService } from './completed.service';
import { CompletedController } from './completed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from '../notes/entities/note.entity';
import { Completed, CompletedSchema } from './entities/completed.entity';

@Module({
  controllers: [CompletedController],
  providers: [CompletedService],
  imports: [
    MongooseModule.forFeature([
      {name: Note.name, schema: NoteSchema },
      {name: Completed.name, schema: CompletedSchema },
    ])
  ]
})
export class CompletedModule {}
