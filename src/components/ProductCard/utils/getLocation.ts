import { defaultLocation, locationMap } from "./locationMap";
import type { Product } from "@/features/products/types/product";

export function getLocation(product: Product) {
  return locationMap[product.location_id] ?? defaultLocation;
}
