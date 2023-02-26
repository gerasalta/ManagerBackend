import { IsString, MaxLength, MinLength } from "class-validator";


export class CreateLoginDto {

    @IsString()
    @MinLength(6)
    @MaxLength(14)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(14)
    password: string;
    
}
