import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
{
    member:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },

    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required:true
    },

    startDate:{
        type:Date,
        default:Date.now
    },

    endDate:{
        type:Date,
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

export default mongoose.model("Membership",membershipSchema);