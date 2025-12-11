import type { Product } from "@/features/products/types/product";

export function getCustomsInfo(product: Product) {
    const isCustom = !!product.customs_passed;
    const label = isCustom ? "განბაჟებული" : "განბაჟება 2,176 ₾";

    return { isCustom, label };
}
