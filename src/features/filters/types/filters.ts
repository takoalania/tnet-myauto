export type FilterValues = {
    ForRent: string;
    Mans: string[];
    ModelIds: Record<string, string[]>,
    Cats: string[];
    PriceFrom: string;
    PriceTo: string;
    Currency: Currency;
    CategoryTab: string;
    Period: string;
    SortOrder: string;
};

export type Currency = "GEL" | "USD";
