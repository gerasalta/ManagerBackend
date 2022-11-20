import { IsNumber } from "class-validator";


export class CreateAdvanceDto {

    @IsNumber()
    advance: number

}
