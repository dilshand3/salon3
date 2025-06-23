import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath: string): Promise<{ url: string, from: "cloudinary" | "local" } | null> => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        return { url: response.url, from: "cloudinary" };
    } catch (error) {
        try {
            const publicImgDir = path.join(__dirname, "../../public/publicImg");
            if (!fs.existsSync(publicImgDir)) {
                fs.mkdirSync(publicImgDir, { recursive: true });
            }
            const fileName = path.basename(localFilePath);
            const destPath = path.join(publicImgDir, fileName);
            fs.renameSync(localFilePath, destPath);
            const localUrl = `/publicImg/${fileName}`;
            return { url: localUrl, from: "local" };
        } catch (moveError) {
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }
            return null;
        }
    }
};

export { uploadOnCloudinary };