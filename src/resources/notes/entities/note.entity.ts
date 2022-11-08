import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Advances, AdvancesSchema } from "./advances.entitiy";
import { Orders, OrdersSchema } from "./orders.entity";


@Schema({timestamps: true})
export class Note extends Document{

    @Prop({
        required:true,
        type: String
    })
    clientId: string;

    @Prop({
        type: [OrdersSchema],
    })
    orders: Orders[]

    @Prop({
         type: [AdvancesSchema] 
        })
    advances: Advances[];

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

}

export const NoteSchema = SchemaFactory.createForClass(Note);