import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { AdvancesService } from './advances.service';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';

@Controller('advances')
export class AdvancesController {
  constructor(private readonly advancesService: AdvancesService) {}

  @Post()
  create(@Body() createAdvanceDto: CreateAdvanceDto) {
    return this.advancesService.create(createAdvanceDto);
  }

  @Get()
  findAll() {
    return this.advancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.advancesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateAdvanceDto: UpdateAdvanceDto
    ) {
    return this.advancesService.update(id, updateAdvanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.advancesService.remove(id);
  }
}
