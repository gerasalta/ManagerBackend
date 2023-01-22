import { IsOptional, MinLength, IsInt, IsPositive, IsString } from "class-validator";



export class CreateClientDto {
    
    @IsString()
    name: string;
    
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
