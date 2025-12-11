import { TbTrash } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

import type { FilterValues } from "@/features/filters/types/filters";
import type { Category, Manufacturer, Model } from "@/types/api";

import { buildChips, getChipLabel, removeChip } from "@/features/filters/utils/chips";
import { useCategories, useManufacturers, useModels } from "@/features/filters/hooks/useFilters";

import { getDefaultFilters } from "@/features/filters/utils/defaultFilters";

type Props = {
    filters: FilterValues;
    onUpdate: (next: FilterValues) => void;
};

export default function FilterChips({ filters, onUpdate }: Props) {
    const chips = buildChips(filters);

    const { data: mansData } = useManufacturers();
    const { data: catsData } = useCategories();
    const modelsByMan = useModels(filters.Mans);

    const manLabels: Record<string, string> = {};
    const modelLabels: Record<string, string> = {};
    const catLabels: Record<string, string> = {};

    mansData?.forEach((m: Manufacturer) => {
        manLabels[String(m.man_id)] = m.man_name;
    });

    modelsByMan.forEach(({ models }) => {
        models.forEach((model: Model) => {
        modelLabels[String(model.model_id)] = model.model_name;
        });
    });

    catsData?.forEach((c: Category) => {
        catLabels[String(c.category_id)] = c.title;
    });

    if (chips.length === 0) return null;

    return (
        <div className="w-full flex items-center gap-3
                        mt-4
                        bg-transparent
                        px-3
                        md:bg-white
                        md:rounded-[16px]
                        md:px-[16px] md:py-[8px]"
        >
            <button
                onClick={() => onUpdate(getDefaultFilters())}
                className="w-[40px] h-[40px] border rounded-full flex items-center justify-center text-[#8C929B]"
            >
                <TbTrash size={18} />
            </button>

            <div className="w-px h-[24px] bg-[#E3E6EA]" />

            <div className="flex flex-wrap gap-2">
                {chips.map((chip, idx) => (
                    <div
                        key={idx}
                        className="inline-flex items-center bg-white rounded-full h-[32px] pl-[12px] pr-[4px] md:bg-[#F2F3F6]"
                    >
                        <span className="pr-1">
                        {getChipLabel(chip, manLabels, modelLabels, catLabels)}
                        </span>

                        <button
                        onClick={() => {
                            const next = removeChip(filters, chip);
                            onUpdate(next);
                        }}
                        className="w-[24px] h-[24px] rounded-full hover:bg-[#E3E6EA] flex items-center justify-center bg-white md:bg-transparent"
                        >
                        <IoClose size={16} className="text-[#272A37]" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
