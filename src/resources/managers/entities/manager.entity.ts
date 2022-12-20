import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Manager extends Document {
   
    @Prop({
        type: String,
        required: true
    })
    manager: string

    
}


export const ManagerSchema = SchemaFactory.createForClass( Manager )
ManagerSchema.set('versionKey', false)
