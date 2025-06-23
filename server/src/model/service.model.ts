import mongoose, { Schema, Document } from "mongoose";

interface Iservice extends Document {
    _id: mongoose.Types.ObjectId;
    serviceName: string;
    price: string;
    duration: string;
    description: string;
}

const serviceSchema = new Schema<Iservice>({
    serviceName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Service = mongoose.model("Service", serviceSchema);