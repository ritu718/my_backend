import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        unique:true,
        lowercase:true
    },

    mobile:{
        type:String,
        required:true,
        unique:true
    },

    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required:true
    },

    status:{
        type:String,
        enum:["Active","Expired"],
        default:"Active"
    }

},
{
timestamps:true
}
);

export default mongoose.model("Member",memberSchema);