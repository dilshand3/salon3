import mongoose, { Schema } from "mongoose";

interface Iuser {
    _Id: mongoose.Types.ObjectId;
    email: string;
    isVerified: boolean;
    password?: string;
    name?: string;
    number?: string;
}

const userSchema = new Schema<Iuser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    number: {
        type: String,
    }
}, {
    timestamps: true
});

export const User = mongoose.model<Iuser>("User", userSchema);