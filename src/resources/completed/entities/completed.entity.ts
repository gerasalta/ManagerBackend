import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Advances, AdvancesSchema } from "src/resources/notes/entities/advances.entitiy";
import { Orders, OrdersSchema } from "src/resources/notes/entities/orders.entity";

@Schema({timestamps: true})
export class Completed extends Document {

    @Prop({
        required: true,
        type: String
    })
    _id: string

    @Prop({
        required: true,
        type: String
    })
    clientId: string

    @Prop({
        required: true,
        type: Number
    })
    discount: number

    @Prop({
        required: true,
        type: [OrdersSchema]
    })
    orders: Orders[]

    @Prop({
        required: true,
        type: [AdvancesSchema]
    })
    advances: Advances[]

    @Prop({
        required: true,
        type: Number
    })
    debt: number

}

export const CompletedSchema = SchemaFactory.createForClass(Completed)
CompletedSchema.set('versionKey', false)



