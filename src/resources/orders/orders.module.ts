import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { NotesModule } from '../notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from '../notes/entities/note.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    MongooseModule.forFeature([
      {name: Note.name, schema: NoteSchema }
    ])
  ]
})
export class OrdersModule {}
