import { IsString } from "class-validator";



export class UpdateTaskDto{

    @IsString()
    manager: string;

}
