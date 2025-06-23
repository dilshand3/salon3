import mongoose, { Schema, Document } from "mongoose";

interface Isalon extends Document {
    _id: mongoose.Types.ObjectId;
    shopName: string;
    isVerified: boolean;
    shopId: string;
    number: string;
    password: string;
    address?: string;
    city: string;
    state?: string;
    pinCode?: string;
    latitude?: number;
    longitude?: number;
    number1?: string;
    number2?: string;
    email?: string;
    gallery?: string[];
    profilePhoto?: string;
    ServiceList?: mongoose.Types.ObjectId[];
    workerList?: mongoose.Types.ObjectId[];
    review?: mongoose.Types.ObjectId[];
    description?: string
    openingTime?: Date;
    closingTime?: Date;
    genderCategory?: string;
    socialLinks?: {
        instagram: string,
        facebook: string,
        youtube: string,
        website: string
    }
    follower?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const salonSchema = new Schema<Isalon>(
    {
        shopName: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        shopId: {
            type: String,
            unique: true,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pinCode: {
            type: String
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        number1: {
            type: String
        },
        number2: {
            type: String
        },
        email: {
            type: String
        },
        gallery: [{
            type: String,
            default: []
        }],
        profilePhoto: {
            type: String
        },
        ServiceList: [{
            type: mongoose.Types.ObjectId,
            ref: "Service",
            default: []
        }],
        workerList: [{
            type: mongoose.Types.ObjectId,
            ref: "Worker",
            default: []
        }],
        review: [{
            type: mongoose.Types.ObjectId,
            ref: "Review",
            default: []
        }],
        description: {
            type: String,
        },
        openingTime: {
            type: Date
        },
        closingTime: {
            type: Date
        },
        genderCategory: {
            type: String,
            enum: ['Male', 'Female', 'Unisex'],
            default: 'Unisex'
        },
        socialLinks: {
            instagram: {
                type: String,
                default: null
            },
            facebook: {
                type: String,
                default: null
            },
            youtube: {
                type: String,
                default: null
            },
            website: {
                type: String,
                default: null
            }
        },
        follower: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }]
    }, { timestamps: true }
);

salonSchema.methods.toJSON = function () {
    const salonObject = this.toObject();
    delete salonObject.password;
    return salonObject;
};

export const Salon = mongoose.model<Isalon>("Salone", salonSchema);