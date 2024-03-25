import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likesSchema = new Schema({
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
    }
},
    { timestamps: true }
)

export default mongoose.model("Like", likesSchema)