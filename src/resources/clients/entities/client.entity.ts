import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

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
        index: true,
        unique: true,
    })
    phone: string;

    @Prop({
        index: true,
        default: 'none'
    })
    address: string;

    @Prop({
        index: true,
        default: 'none'
    })
    company: string;
}


export const ClientSchema = SchemaFactory.createForClass( Client )
ClientSchema.plugin(aggregatePaginate)
ClientSchema.set('timestamps', true)
ClientSchema.set('autoIndex', true)
