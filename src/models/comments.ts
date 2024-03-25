import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    author: {
        type: String,
        required: true
      },
    comment: {
        type: String,
        required: true
    },
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }
},
    { timestamps: true }
);

export default mongoose.model("Comment", commentsSchema);