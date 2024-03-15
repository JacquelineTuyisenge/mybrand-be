import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    }
},
    { timestamps: true}
);

export default mongoose.model("User", UserSchema);