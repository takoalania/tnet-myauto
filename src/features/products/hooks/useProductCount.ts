import type { FilterValues } from "@/features/filters/types/filters";
import { useQuery } from "@tanstack/react-query";
import { getProductCount } from "../api/getProductCount";

export const useProductCount = (filters: FilterValues, period: string, sortOrder: string) => {
    return useQuery({
        queryKey: ["count", filters],
        queryFn: async () => getProductCount(filters, period, sortOrder),
    });
}