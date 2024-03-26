import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    author: {
        type: String
    }
},
    { timestamps: true }
);

export default mongoose.model("Comment", commentsSchema);