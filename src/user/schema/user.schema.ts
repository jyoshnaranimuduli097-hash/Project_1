import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps : true})
export class User{
    @Prop({
        type:String,
        required:true,
        unique:true,
        trim:true
    })
    userName : string;

    @Prop({
        type : String,
        required:true,
        unique:true,
        trim:true
    })
    email : string;

    @Prop({
        type:String,
        required:true
    })
    password : string;

    @Prop({
        type:Number,
        required:true
    })
    age : number;

    @Prop({
        type:String,
        default:null
    })
    refreshTokenHash : string | null;
}

export const userSchema = SchemaFactory.createForClass(User)