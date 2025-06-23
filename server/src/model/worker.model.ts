import mongoose, { Schema, Document } from "mongoose";

interface Iworker extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    avatar: string;
    spcelization: string;
}

const workerSchema = new Schema<Iworker>({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    spcelization: {
        type: String,
        required: true
    }
});

export const Worker = mongoose.model<Iworker>("Worker", workerSchema);