import type { FilterValues } from "../types/filters";

export const getDefaultFilters = (): FilterValues => ({
    ForRent: "0",
    Mans: [],
    ModelIds: {},
    Cats: [],
    PriceFrom: "",
    PriceTo: "",
    Currency: "GEL",
    CategoryTab: "car",
    Period: "",
    SortOrder: "",
});
