import { IsOptional, MinLength, IsInt, IsPositive, IsString, IsNotEmpty, ValidateIf } from "class-validator";



export class CreateClientDto {
    
    @MinLength(3)
    @IsString()
    name: string;
    
    @MinLength(3)
    @IsString()
    lastName: string;
    
    @IsInt()
    @IsPositive()
    phone: number;
    
    @IsOptional()
    @IsString()
    address: string;
    
    @IsOptional()
    @IsString()
    company: string;

}
