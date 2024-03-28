import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likesSchema = new Schema({
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},
    { timestamps: true }
)

export default mongoose.model("Like", likesSchema)