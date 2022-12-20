import { IsString, MinLength } from "class-validator";


export class CreateManagerDto {

    @IsString()
    @MinLength(4)
    manager: string

}
