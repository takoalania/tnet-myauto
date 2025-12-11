import type { Product } from "../../../features/products/types/product";
import { fuelTypeMap, gearTypeMap, bodyTypeMap } from "./specMaps";

export type SpecItem =
  | { type: "normal"; icon: React.ComponentType<any>; value: string }
  | { type: "body"; value: string }
  | { type: "location"; flag: string; value: string };

export function buildSpecs(
  product: Product,
  isMobile: boolean,
  location: { label: string; flag: string },
  EngineIcon: React.ComponentType<any>,
  MileageIcon: React.ComponentType<any>,
  TransmissionIcon: React.ComponentType<any>,
  DriveIcon: React.ComponentType<any>
): SpecItem[] {
  const fuel = fuelTypeMap[product.fuel_type_id ?? 0] ?? "";
  const gear = gearTypeMap[product.gear_type_id ?? 0] ?? "უცნობია";
  const normalizedEngine = product.engine_volume
    ? (product.engine_volume / 1000).toFixed(1)
    : "";
  const steering = product.right_wheel ? "მარჯვენა" : "მარცხენა";
  const bodyType = bodyTypeMap[product.vehicle_type ?? 0] ?? "";

  const specs: SpecItem[] = [
    {
      type: "normal",
      icon: EngineIcon,
      value: `${normalizedEngine} ლ. ${fuel}`,
    },
    {
      type: "normal",
      icon: MileageIcon,
      value: `${product.car_run_km} კმ`,
    },
    {
      type: "normal",
      icon: TransmissionIcon,
      value: gear,
    },
    {
      type: "normal",
      icon: DriveIcon,
      value: steering,
    },
  ];

  if (isMobile && bodyType) {
    specs.splice(1, 0, {
      type: "body",
      value: bodyType,
    });
  }

  if (isMobile) {
    specs.push({
      type: "location",
      flag: location.flag,
      value: location.label,
    });
  }

  return specs;
}
