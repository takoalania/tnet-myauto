import type { Product } from "@/features/products/types/product";

export function getDisplayName(
    product: Product,
    manufacturersMap: Record<string | number, string>
): string {
    const model = product.car_model?.trim();
    const brand = manufacturersMap[product.man_id] ?? "";

    if (brand && model) return `${brand} ${model}`;
    if (brand) return brand;
    if (model) return model;

    return "უცნობი მოდელი";
}
