import { useQuery } from "@tanstack/react-query";
import type { FilterValues } from "../../filters/types/filters";
import { getProducts } from "../api/getProducts";

export const useProducts = (filters: FilterValues, period: string, sortOrder: string) => {
  return useQuery({
    queryKey: ["products", filters, period, sortOrder],
    queryFn: async () => getProducts(filters, period, sortOrder),
  });
};
