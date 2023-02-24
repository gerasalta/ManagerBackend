import { IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    managerId: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    reference: string;

}
