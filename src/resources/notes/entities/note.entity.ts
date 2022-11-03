import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, SchemaTypes, Types  } from 'mongoose';


@Schema()
class Orders {

    @Prop({
        required: true,
        type: String
    })
    title: string;

    @Prop({
        required: true,
        type: Number
    })
    price: number;

    @Prop({
        required: true,
        type: String
    })
    description: string;
    
}

@Schema()
export class Advances extends Document {

    @Prop({
        required: true,
        type: Number,
    })
    advance: number;

}

export const AdvancesSchema = SchemaFactory.createForClass(Advances);


@Schema({timestamps: true})
export class Note extends Document{

    @Prop({
        required:true,
        type: String
    })
    clientId: string;

    @Prop({
        type: MongooseSchema.Types.Array,
        _id: true
    })
    orders: Orders[]

    @Prop({
        type: MongooseSchema.Types.Array
    })
    advances: Advances[];

    @Prop({
        required: true,
        type: Number
    })
    discount: number

    @Prop({
        required: true,
        type: Date
    })
    term: Date

}

export const NoteSchema = SchemaFactory.createForClass(Note);