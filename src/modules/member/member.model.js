import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },
 
    mobile: {
      type: String,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"plan",
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Member",
  memberSchema
);