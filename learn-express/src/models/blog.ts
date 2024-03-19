import mongoose, {Schema, Document } from "mongoose";
import { CommentObject } from "../controllers/comments.controllers";

export interface IBlog extends Document {
    title: string;
    author: string;
    content: string;
    blogComments: CommentObject[];
    blogLikes: Array<mongoose.Types.ObjectId>;
}

// const schema = mongoose.Schemas
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
    blogComments: [{ // Define blogComments as an array of objects containing author and comment properties
      author: { type: String },
      comment: { type: String }
  }],
    blogLikes: [{type: mongoose.Types.ObjectId, ref: "Like"}]
  },
  { timestamps: true}
);

export default mongoose.model<IBlog>("Blog", BlogSchema);