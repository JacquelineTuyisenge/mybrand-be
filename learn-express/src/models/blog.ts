import mongoose, {Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    author: string;
    content: string;
}

// const schema = mongoose.Schema
const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
  },
  { timestamps: true}
);

export default mongoose.model<IBlog>("Blog", BlogSchema);