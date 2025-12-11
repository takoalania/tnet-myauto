import type { FilterValues } from "../types/filters";

export const parseFiltersFromUrl = (search: string): FilterValues => {
  const params = new URLSearchParams(search);

  const mansParam = params.get("Mans") ?? "";

  const Mans: string[] = [];
  const ModelIds: Record<string, string[]> = {};

  if (mansParam) {
    const blocks = mansParam.split("-");

    blocks.forEach((block) => {
      const parts = block.split(".");

      const manId = parts[0];
      Mans.push(manId);

      const models = parts.slice(1);
      if (models.length > 0) {
        ModelIds[manId] = models;
      }
    });
  }

  return {
    ForRent: params.get("ForRent") ?? "0",

    Mans,
    ModelIds,

    Cats: params.get("Cats")
      ? params.get("Cats")!.split(".")
      : [],

    PriceFrom: params.get("PriceFrom") ?? "",
    PriceTo: params.get("PriceTo") ?? "",

    Currency: params.get("CurrencyID") === "1" ? "USD" : "GEL",

    CategoryTab:
      params.get("TypeID") === "1"
        ? "tractor"
        : params.get("TypeID") === "2"
        ? "moto"
        : "car",

    Period: params.get("Period") ?? "",
    SortOrder: params.get("SortOrder") ?? "",
  };
};
