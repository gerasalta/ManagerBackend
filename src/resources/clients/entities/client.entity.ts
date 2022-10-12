import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Client extends Document {
    @Prop({
        index: true,
        minlength: 3,
    })
    name: string;

    @Prop({
        index: true,
        minlength: 3  
    })
    lastName: string;

    @Prop({
        unique: true,
        index: true,
    })
    phone: number;

    @Prop({
        index: true,
        default: 'none'
    })
    address: string;

    @Prop({
        default: 'none'
    })
    company: string;
}


export const ClientSchema = SchemaFactory.createForClass( Client )
ClientSchema.set('timestamps', true)
