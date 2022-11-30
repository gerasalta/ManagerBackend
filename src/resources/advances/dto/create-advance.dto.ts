import { IsInt, IsNumber, IsPositive } from "class-validator";


export class CreateAdvanceDto {

    @IsNumber()
    @IsInt()
    @IsPositive()
    advance: number

}
