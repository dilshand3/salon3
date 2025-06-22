import { Salon } from '../model/salon.model';

const generateShopId = (shopName: string): string => {
    const cleanName = shopName.trim().toLowerCase().replace(/\s+/g, "");
    const prefix = cleanName.slice(0, 4);
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${randomNumber}`;
};

export const generateUniqueShopId = async (shopName: string): Promise<string> => {
    let shopId = generateShopId(shopName);
    let exists = await Salon.findOne({ shopId });

    while (exists) {
        shopId = generateShopId(shopName);
        exists = await Salon.findOne({ shopId });
    }

    return shopId;
};

export { generateShopId }