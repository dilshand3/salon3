import mongoose, { Schema, Document } from "mongoose";

interface Ireview extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    salon: mongoose.Types.ObjectId;
    starRating: Number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const reviewSchema = new Schema<Ireview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    salon: {
        type: Schema.Types.ObjectId,
        ref: "Salone",
        required: true
    },
    starRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Review = mongoose.model<Ireview>("Review", reviewSchema);