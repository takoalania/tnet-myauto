import type { FilterValues } from "../types/filters";

export type Chip =
    | { key: "Mans"; value: string }
    | { key: "ModelIds"; value: { manId: string; model: string } }
    | { key: "Cats"; value: string }
    | { key: "PriceFrom"; value: string }
    | { key: "PriceTo"; value: string }
    | { key: "ForRent"; value: string };

export function buildChips(filters: FilterValues): Chip[] {
    const chips: Chip[] = [];

    chips.push({ key: "ForRent", value: filters.ForRent });

    if (filters.PriceFrom) chips.push({ key: "PriceFrom", value: filters.PriceFrom });
    if (filters.PriceTo) chips.push({ key: "PriceTo", value: filters.PriceTo });

    filters.Mans.forEach((id) => {
    chips.push({ key: "Mans", value: id });
    });

    Object.entries(filters.ModelIds).forEach(([manId, modelList]) => {
    modelList.forEach((model) => {
        chips.push({ key: "ModelIds", value: { manId, model } });
    });
    });

    filters.Cats.forEach((c) => chips.push({ key: "Cats", value: c }));

    return chips;
}

export function getChipLabel(
    chip: Chip,
    mans: Record<string, string>,
    models: Record<string, string>,
    cats: Record<string, string>
): string {
    switch (chip.key) {
    case "Mans":
        return mans[chip.value] || chip.value;

    case "ModelIds":
        return models[chip.value.model] || chip.value.model;

    case "Cats":
        return cats[chip.value] || chip.value;

    case "PriceFrom":
        return `ფასი: ${chip.value} დან`;

    case "PriceTo":
        return `ფასი: ${chip.value} მდე`;

    case "ForRent":
        return chip.value === "0" ? "იყიდება" : "ქირავდება";

    default:
        return String((chip as any).value);
    }
}

export function removeChip(filters: FilterValues, chip: Chip): FilterValues {
    const next: FilterValues = { ...filters };

    switch (chip.key) {

        case "Mans": {
            const manId = String(chip.value);

            next.Mans = next.Mans.map(String).filter((id) => id !== manId);

            const updatedModels: Record<string, string[]> = {};

            Object.entries(next.ModelIds).forEach(([key, modelList]) => {
            if (String(key) !== manId) {
                updatedModels[key] = modelList;
            }
            });

            next.ModelIds = updatedModels;

            return next;
        }

        case "ModelIds": {
            const manId = String(chip.value.manId);
            const modelId = String(chip.value.model);

            const rest = (next.ModelIds[manId] ?? [])
            .map(String)
            .filter((m) => m !== modelId);

            if (rest.length === 0) {
            delete next.ModelIds[manId];
            } else {
            next.ModelIds[manId] = rest;
            }

            return next;
        }

        case "Cats":
            next.Cats = next.Cats.map(String).filter((c) => c !== String(chip.value));
            return next;

        case "PriceFrom":
            next.PriceFrom = "";
            return next;

        case "PriceTo":
            next.PriceTo = "";
            return next;

        case "ForRent":
            next.ForRent = "0";
            return next;

        default:
            return next;
        }
}
