import axios from "axios";

export const getLatLongFromMap = async (address: string): Promise<{ latitude: number; longitude: number } | null> => {
    try {
        const apiKey = process.env.GOOGLE_MAP_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json`;
        const response = await axios.get(url, {
            params: {
                address,
                key: apiKey,
            },
        });
        const results = response.data.results;
        if (results.length === 0) return null;

        const location = results[0].geometry.location;
        return {
            latitude: location.lat,
            longitude: location.lng,
        };
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
}