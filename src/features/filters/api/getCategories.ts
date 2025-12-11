import { API_ENDPOINTS } from "../../../config/api";

export const getCategories = async () => {
    const res = await fetch(API_ENDPOINTS.categories);

    if (!res.ok) {
        throw new Error("Failed to load categories");
    }

    const json = await res.json();

    return json.data;
}