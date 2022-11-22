import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CompletedService } from './completed.service';
import { CreateCompletedDto } from './dto/create-completed.dto';
import { UpdateCompletedDto } from './dto/update-completed.dto';

@Controller('completed')
export class CompletedController {
  constructor(private readonly completedService: CompletedService) {}

  @Post(':id')
  create(@Param('id', ParseMongoIdPipe) id: string) {
    return this.completedService.create(id);
  }

  @Get()
  findAll() {
    return this.completedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompletedDto: UpdateCompletedDto) {
    return this.completedService.update(+id, updateCompletedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completedService.remove(+id);
  }
}
