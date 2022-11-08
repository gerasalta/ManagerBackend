import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Advances extends Document {

    @Prop({
        required: true,
        type: Number
    })
    advance: number;

}

export const AdvancesSchema = SchemaFactory.createForClass(Advances);