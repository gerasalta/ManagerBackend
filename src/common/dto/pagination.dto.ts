import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class PaginationDto{

    @IsInt()
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    @Min(1)
    pageIndex: number;

    @IsString()
    @IsOptional()
    sort: string;

    @IsString()
    @IsOptional()
    keyword: string;

    @IsBoolean()
    @IsOptional()
    complete: boolean

}