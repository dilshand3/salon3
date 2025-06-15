import mongoose, { Schema } from "mongoose";

interface Iuser {
    _Id: mongoose.Types.ObjectId;
    email: string;
    password : string;
    name: string;
    number: string;
}

const userSchema = new Schema<Iuser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
      type : String,
      required : true,
    },
    name: {
        type: String,
    },
    number : {
        type : String,
        required : true
    }
}, {
    timestamps: true
});

export const User = mongoose.model<Iuser>("User", userSchema);