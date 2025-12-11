import { API_ENDPOINTS } from "../../../config/api";

export const getManufacturers = async () => {
    const res = await fetch(API_ENDPOINTS.manufacturers);

    if (!res.ok) {
        throw new Error("Failed to load manufacturers");
    }

    return res?.json();
}