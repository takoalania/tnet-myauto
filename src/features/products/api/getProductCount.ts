import { API_ENDPOINTS } from "@/config/api";
import type { FilterValues } from "@/features/filters/types/filters";
import { buildingQueryString } from "@/features/filters/utils/queryBuilder";

export const getProductCount = async (filters: FilterValues, period: string, sortOrder: string) => {
    const qs = buildingQueryString(filters, period, sortOrder);
    const res = await fetch(`${API_ENDPOINTS.count}?${qs}`);

    if (!res.ok) {
        throw new Error("Failed to fetch count");
    }

    const json = await res.json();

    return json?.data?.[0]?.count ?? 0;
}

