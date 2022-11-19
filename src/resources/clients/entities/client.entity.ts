import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

@Schema({timestamps: true})
export class Client extends Document {
    @Prop({
        minlength: 3,
    })
    name: string;

    @Prop({
        minlength: 3  
    })
    lastName: string;

    @Prop({
        unique: true,
    })
    phone: string;

    @Prop({
        default: 'none'
    })
    address: string;

    @Prop({

        default: 'none'
    })
    company: string;
}


export const ClientSchema = SchemaFactory.createForClass( Client )
ClientSchema.plugin(aggregatePaginate)
ClientSchema.set('timestamps', true)
ClientSchema.set('versionKey', false)
