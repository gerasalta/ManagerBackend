import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

@Schema({ timestamps: true })
export class Advances extends Document {

    @Prop({
        required: true,
        type: Number
    })
    advance: number;

}

export const AdvancesSchema = SchemaFactory.createForClass(Advances);
AdvancesSchema.plugin(aggregatePaginate);
AdvancesSchema.set('versionKey', false)
