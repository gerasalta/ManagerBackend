import { IsOptional, MinLength, IsInt, IsPositive, IsString } from "class-validator";



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
    @MinLength(3)
    address: string;
    
    @IsOptional()
    @MinLength(1)
    @IsString()
    company: string;

}
