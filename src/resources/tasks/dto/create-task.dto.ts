import { IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    manager: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    reference: string;

}
