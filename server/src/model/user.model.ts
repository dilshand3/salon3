import mongoose, { Schema , Document } from "mongoose";

interface Iuser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    isVerified: boolean;
    password?: string;
    review? : mongoose.Types.ObjectId[];
    name?: string;
    number?: string;
    following? : mongoose.Types.ObjectId[];
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
        unique: true
    },
    review : [{
        type : mongoose.Types.ObjectId,
        ref : "Review"
    }],
    following : [{
        type : mongoose.Types.ObjectId,
        ref : "Salon"
    }]
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

export const User = mongoose.model<Iuser>("User", userSchema);