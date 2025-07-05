import mongoose, { Schema, Document } from "mongoose";

interface Ibooking extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    salon: mongoose.Types.ObjectId;
    service: mongoose.Types.ObjectId[];
    worker?: mongoose.Types.ObjectId;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    note?: string;
    time: Date;
    createAt: Date;
    updatedAt: Date;
}

const bookingSchema = new Schema<Ibooking>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    salon: {
        type: Schema.Types.ObjectId,
        ref: "Salon"
    },
    service: [{
        type: Schema.Types.ObjectId,
        ref: "Service"
    }],
    worker: {
        type: Schema.Types.ObjectId,
        ref: "Worker"
    },
    status: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "completed",
            "cancelled"
        ],
        default : "pending"
    },
    note: {
        type: String
    },
    time: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

export const Booking = mongoose.model("Booking",bookingSchema);