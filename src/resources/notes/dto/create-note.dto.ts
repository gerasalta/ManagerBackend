import { ArrayMinSize, IsArray, IsDate, IsInt, IsMongoId, IsString, ValidateNested } from "class-validator";
import { ObjectId } from "mongoose";

class Orders{

    @IsString()
    title: string;
    
    @IsInt()
    price: number;
    
    @IsString()
    description: string;

}

class Advances{

    @IsInt()
    advance: number;

}

export class CreateNoteDto {

    @IsString()
    clientId: string;

    @IsInt()
    discount: number;

    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @IsArray()
    advances: Advances

    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @IsArray()
    orders: Orders

    @IsDate()
    term: Date

    @IsString()
    manager: string

}
