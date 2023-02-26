import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true, versionKey: false})
export class Signup extends Document{

    @Prop()
    username: string

    @Prop()
    password: string

}

export const SignupSchema = SchemaFactory.createForClass( Signup )