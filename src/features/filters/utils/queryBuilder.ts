import type { FilterValues } from "../types/filters";

export const buildingQueryString = (filters: FilterValues, period?: string, sortOrder?: string) => {
  const params = new URLSearchParams();

  params.set(
    "TypeID",
    filters.CategoryTab === "car" ? "0"
      : filters.CategoryTab === "moto" ? "1"
      : "2"
  );

  params.set("ForRent", filters.ForRent);

  let mansString = "";

  if (filters.Mans.length > 0) {
    mansString = filters.Mans
      .map((manId) => {
        const models = filters.ModelIds[manId] ?? [];

        if (models.length > 0) {
          return `${manId}.${models.join(".")}`;
        } else {
          return manId;
        }
      })
      .join("-");
  }

  if (mansString) {
    params.set("Mans", mansString);
  }

  if (filters.Cats.length > 0) {
    params.set("Cats", filters.Cats.join("."));
  }

  if (filters.PriceFrom) params.set("PriceFrom", filters.PriceFrom);
  if (filters.PriceTo) params.set("PriceTo", filters.PriceTo);

  params.set("CurrencyID", filters.Currency === "USD" ? "1" : "3");

  if (period) params.set("Period", period);
  if (sortOrder) params.set("SortOrder", sortOrder);

  return params.toString();
};
