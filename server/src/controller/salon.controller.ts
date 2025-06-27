import { Request, Response } from "express";
import { Salon } from "../model/salon.model";
import { generateShopId } from "../utils/shopId";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/cookies";
import { IauthnticatedRequest } from "../middlewares/verifyToken.middlware";
import mongoose from "mongoose";
import { getLatLongFromMap } from "../utils/getLocationOnMap";
import { uploadOnCloudinary } from "../utils/cloudinary";

interface IResponse {
    success: boolean;
    message: string;
    data?: object
}

interface IregsiterSalonReq {
    shopName: string;
    number: string;
    password: string
}

export const registerSalon = async (req: Request<{}, {}, IregsiterSalonReq>, res: Response<IResponse>): Promise<void> => {
    try {
        const { shopName, number, password } = req.body;
        if (!shopName || !number || !password) {
            res.status(400).json({
                success: false,
                message: "All field required"
            });
            return
        }
        const shopId = generateShopId(shopName);
        const hashedpassword = await bcrypt.hash(password, 10);

        const registedShop = await Salon.create({
            shopId,
            shopName,
            number,
            password: hashedpassword
        });
        if (!registedShop) {
            res.status(404).json({
                success: false,
                message: "Shop didn't register"
            });
            return
        }
        generateTokenAndSetCookie(res, registedShop?._id.toString() as string);
        res.status(201).json({
            success: true,
            message: "shop registeration success",
            data: registedShop
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getSalonDetail = async (req: IauthnticatedRequest, res: Response<IResponse>): Promise<void> => {
    try {
        const salonId = req.userId;
        if (!salonId || !mongoose.isValidObjectId(salonId)) {
            res.status(401).json({
                success: false,
                message: "Please provide Valid SalonId"
            })
            return;
        }
        const existedShop = await Salon.findById(salonId)
            .populate("ServiceList")
            .populate("workerList")
            .populate("review")
            .populate("follower");

        if (!existedShop) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Salon detail fetched successfully",
            data: existedShop
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

interface IAddSalonAddressReq {
    address: string;
    city: string;
    state?: string;
    pinCode?: string;
}

type TaddSalonAddressReq = IauthnticatedRequest & {
    body?: IAddSalonAddressReq
};

export const AddSalonAddress = async (req: TaddSalonAddressReq, res: Response<IResponse>): Promise<void> => {
    try {
        const salonId = req.userId;
        if (!salonId || !mongoose.isValidObjectId(salonId)) {
            res.status(401).json({
                success: false,
                message: "Please provide Valid SalonId"
            })
            return;
        }
        let existedShop = await Salon.findById(salonId);
        if (!existedShop) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }
        if (!req.body) {
            res.status(400).json({
                success: false,
                message: "Body is required"
            })
            return;
        }
        const { address, city, state, pinCode } = req.body;
        if (!address || !city || !state || !pinCode) {
            res.status(400).json({
                success: false,
                message: "All field required"
            })
            return;
        }

        const fullAddress = `${address}, ${city}, ${state}, ${pinCode}`;
        const coordinates = await getLatLongFromMap(fullAddress);
        const updateSalon = await Salon.findByIdAndUpdate(
            salonId,
            {
                address,
                city,
                state,
                pinCode,
                latitude: coordinates?.latitude,
                longitude: coordinates?.longitude
            }, { new: true });
        if (!updateSalon) {
            res.status(404).json({
                success: false,
                message: "Updated Salon not found"
            })
            return;
        }
        res.status(201).json({
            success: true,
            message: "Salon location added succesfully",
            data: updateSalon
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

interface IsalonLoginReq {
    shopId: string;
    password: string;
}

export const salonLogin = async (req: Request<IsalonLoginReq>, res: Response<IResponse>): Promise<void> => {
    try {
        const { shopId, password } = req.body;
        if (!shopId || !password) {
            res.status(400).json({
                success: false,
                message: "All fied required"
            })
            return;
        }
        const salon = await Salon.findOne({ shopId });
        if (!salon) {
            res.status(404).json({
                success: false,
                message: "Shop not found"
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, salon.password);
        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid password"
            })
            return;
        }
        await generateTokenAndSetCookie(res, salon._id.toString());

        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: salon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const uploadProfileImages = async (req: IauthnticatedRequest, res: Response<IResponse>): Promise<void> => {
    try {
        const salonId = req.userId;
        if (!salonId || !mongoose.isValidObjectId(salonId)) {
            res.status(401).json({
                success: false,
                message: "Please provide Valid SalonId"
            })
            return;
        }
        let existedShop = await Salon.findById(salonId);
        if (!existedShop) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }

        const profileImg = req.file?.path as string;

        if (!profileImg) {
            res.status(500).json({
                success: false,
                message: "Profile Img required"
            })
            return;
        }

        const uploadResult = await uploadOnCloudinary(profileImg);

        if (!uploadResult) {
            res.status(500).json({
                success: false,
                message: "Profile Image didn't uploaded"
            })
            return;
        }

        const updatedSalon = await Salon.findByIdAndUpdate(
            salonId,
            { profilePhoto: uploadResult?.url },
            { new: true }
        );
        if (!updatedSalon) {
            res.status(404).json({
                success: false,
                message: "Something went wrong"
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: "Profile photo uploaded successfully",
            data: updatedSalon as object
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const uploadGalleryImgs = async (req: IauthnticatedRequest, res: Response<IResponse>): Promise<void> => {
    try {
        const salonId = req.userId;
        if (!salonId || !mongoose.isValidObjectId(salonId)) {
            res.status(401).json({
                success: false,
                message: "Please provide Valid SalonId"
            })
            return;
        }
        let existedShop = await Salon.findById(salonId);
        if (!existedShop) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }

        const files = req.files as Express.Multer.File[];

        if (!files || files.length < 3 || files.length > 6) {
            res.status(400).json({
                success: false,
                message: "Minimum 3 and maximum 6 images are required"
            });
            return;
        }

        const galleryUrls: string[] = [];

        for (const file of files) {
            const result = await uploadOnCloudinary(file.path);
            if (result?.url) {
                galleryUrls.push(result.url);
            }
        }

        if (galleryUrls.length < 3) {
            res.status(500).json({
                success: false,
                message: "At least 3 images must be successfully uploaded"
            });
            return;
        }

        existedShop.gallery = [...(existedShop.gallery || []), ...galleryUrls];
        await existedShop.save();

        res.status(200).json({
            success: true,
            message: "Gallery images uploaded successfully",
            data: existedShop
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

interface IaddcontactReq {
    number1?: string;
    number2?: string;
    email?: string;
}

type TcontactReq = IauthnticatedRequest & {
    body?: IaddcontactReq
}

export const addContact = async (req: TcontactReq, res: Response<IResponse>): Promise<void> => {
    try {
        const salonId = req.userId;
        if (!salonId || !mongoose.isValidObjectId(salonId)) {
            res.status(401).json({
                success: false,
                message: "Please provide Valid SalonId"
            })
            return;
        }
        let existedShop = await Salon.findById(salonId);
        if (!existedShop) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }
        if (!req.body) {
            res.status(400).json({
                success: false,
                message: "atleast one field required"
            })
            return;
        }
        const { number1, number2, email } = req.body;

        if (!number1 && !number2 && !email) {
            res.status(400).json({
                success: false,
                message: "atleast one field required"
            })
            return;
        }

        const contactUpdate: Partial<IaddcontactReq> = {};
        if (number1) contactUpdate.number1 = number1;
        if (number2) contactUpdate.number2 = number2;
        if (email) contactUpdate.email = email;

        const updatedSalon = await Salon.findByIdAndUpdate(
            salonId,
            contactUpdate,
            { new: true }
        );

        if (!updatedSalon) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedSalon
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

interface IsocialLinks {
    instagram: string,
    facebook: string,
    youtube: string,
    website: string
}

type TsocialLinks = IauthnticatedRequest & {
    body?: IsocialLinks
}

export const addSocialLinks = async (req: TsocialLinks, res: Response<IResponse>): Promise<void> => {
    try {
        const salonId = req.userId;
        if (!salonId || !mongoose.isValidObjectId(salonId)) {
            res.status(401).json({
                success: false,
                message: "Please provide Valid SalonId"
            })
            return;
        }
        let existedShop = await Salon.findById(salonId);
        if (!existedShop) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }
        if (!req.body) {
            res.status(400).json({
                success: false,
                message: "atleast one field required"
            })
            return;
        }

        const { instagram, facebook, youtube, website } = req.body;

        // Check at least one field is present
        if (!instagram && !facebook && !youtube && !website) {
            res.status(400).json({
                success: false,
                message: "At least one social link is required"
            })
            return;
        }

        // Prepare update object
        const socialLinksUpdate: Partial<IsocialLinks> = {};
        if (instagram) socialLinksUpdate.instagram = instagram;
        if (facebook) socialLinksUpdate.facebook = facebook;
        if (youtube) socialLinksUpdate.youtube = youtube;
        if (website) socialLinksUpdate.website = website;

        // Update only provided fields
        const updatedSalon = await Salon.findByIdAndUpdate(
            salonId,
            {
                $set: {
                    // Use dot notation to update nested fields
                    ...(instagram && { "socialLinks.instagram": instagram }),
                    ...(facebook && { "socialLinks.facebook": facebook }),
                    ...(youtube && { "socialLinks.youtube": youtube }),
                    ...(website && { "socialLinks.website": website }),
                }
            },
            { new: true }
        );

        if (!updatedSalon) {
            res.status(404).json({
                success: false,
                message: "Salon not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Social links updated successfully",
            data: updatedSalon.socialLinks
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}