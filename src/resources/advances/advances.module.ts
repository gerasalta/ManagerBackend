import { Module } from '@nestjs/common';
import { AdvancesService } from './advances.service';
import { AdvancesController } from './advances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from '../notes/entities/note.entity';

@Module({
  controllers: [AdvancesController],
  providers: [AdvancesService],
  imports: [
    MongooseModule.forFeature([
      {name: Note.name, schema: NoteSchema }
    ])
  ]
})
export class AdvancesModule {}
