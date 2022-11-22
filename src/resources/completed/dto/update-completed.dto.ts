import { PartialType } from '@nestjs/mapped-types';
import { CreateCompletedDto } from './create-completed.dto';

export class UpdateCompletedDto extends PartialType(CreateCompletedDto) {}
