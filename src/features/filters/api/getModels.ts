import { API_ENDPOINTS } from "../../../config/api";

export const getModels = async (manId: string) => {
    const res = await fetch(API_ENDPOINTS.models(manId));

    if (!res.ok) {
        throw new Error(`Failed to load models for man_id=${manId}`);
    }

    const json = await res.json();

    return json.data;
}
