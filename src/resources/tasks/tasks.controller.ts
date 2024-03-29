import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  
  @Get()
  findAll(@Query() PaginationDto: PaginationDto) {
    return this.tasksService.findAll(PaginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
