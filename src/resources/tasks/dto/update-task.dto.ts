import { IsString } from "class-validator";



export class UpdateTaskDto{

    @IsString()
    managerId: string;

}
