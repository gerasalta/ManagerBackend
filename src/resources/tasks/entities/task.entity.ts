import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


@Schema({timestamps: true, versionKey: false})
export class Task extends Document {

    @Prop({})
    manager: string;

    @Prop({})
    description: string;

    @Prop({})
    reference: string;

}


export const TaskSchema = SchemaFactory.createForClass( Task )
TaskSchema.plugin(aggregatePaginate)