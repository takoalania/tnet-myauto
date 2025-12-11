import { buildingQueryString } from "../../filters/utils/queryBuilder";
import { API_ENDPOINTS } from "../../../config/api";
import type { FilterValues } from "../../filters/types/filters";

export const getProducts = async (filters: FilterValues, period: string, sortOrder: string) => {
    const qs = buildingQueryString(filters, period, sortOrder);
    const res = await fetch(`${API_ENDPOINTS.products}?${qs}`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const json = await res.json();

    return json?.data ?? [];
}