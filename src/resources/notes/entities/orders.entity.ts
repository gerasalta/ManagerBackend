import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema({timestamps: true})
export class Orders extends Document{

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

export const OrdersSchema = SchemaFactory.createForClass(Orders);