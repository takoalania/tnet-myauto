import type { Currency } from "@/features/filters/types/filters";
import type { Product } from "@/features/products/types/product";


export function getPrice(product: Product, currency: Currency) {
    const isUSD = currency === "USD";

    const rawPrice = isUSD
    ? product.price_usd ?? product.price_value
    : product.price_value ?? product.price_usd;

    const formatted =
    rawPrice != null ? Number(rawPrice).toLocaleString("en-US") : "";

    return {
    rawPrice: rawPrice ?? null,
    formatted,
    };
}
