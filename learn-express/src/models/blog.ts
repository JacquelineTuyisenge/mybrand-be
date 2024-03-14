import mongoose, {Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    author: string;
    content: string;
    blogComments: string[];
    blogLikes: Array<mongoose.Schema.Types.ObjectId>;
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
    blogComments: [{type:String}],
    blogLikes: [{type: mongoose.Schema.Types.ObjectId, ref: "Like"}]
  },
  { timestamps: true}
);

export default mongoose.model<IBlog>("Blog", BlogSchema);