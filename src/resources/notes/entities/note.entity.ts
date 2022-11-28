import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { type } from "os";
import { Advances, AdvancesSchema } from "./advances.entitiy";
import { Orders, OrdersSchema } from "./orders.entity";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');



@Schema({timestamps: true})
export class Note extends Document{

    @Prop({
        required:true,
        type: String
    })
    clientId: string;

    @Prop({
        required: true,
        type: Number,
    })
    discount: number

    @Prop({
        required: true,
        type: Date
    })
    term: Date

    @Prop({
        required: true,
        type: String
    })
    manager: string

    @Prop({
        type: [OrdersSchema],
    })
    orders: Orders[]

    @Prop({
         type: [AdvancesSchema] 
        })
    advances: Advances[];

    @Prop({
        type: Boolean,
        default: false
    })
    complete: boolean

}

export const NoteSchema = SchemaFactory.createForClass(Note);
NoteSchema.plugin(aggregatePaginate)
NoteSchema.set('versionKey', false)