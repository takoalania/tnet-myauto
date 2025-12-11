import { useQueries, useQuery } from "@tanstack/react-query";
import { getManufacturers } from "../api/getManufacturers";
import { getModels } from "../api/getModels";
import { getCategories } from "../api/getCategories";

export const useManufacturers = () => 
    useQuery({
        queryKey: ["manufacturers"],
        queryFn: getManufacturers,
        staleTime: 1000 * 60 * 60,
    });

export const useModels = (manIds: string[]) => {
  const queries = useQueries({
    queries: manIds.map((manId) => ({
      queryKey: ["models", manId],
      queryFn: () => getModels(manId),
      enabled: !!manId,
      staleTime: 1000 * 60 * 60,
    })),
  });

  return manIds.map((manId, index) => ({
    manId,
    models: queries[index].data ?? [],
  }));
};

export const useCategories = () => 
    useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });