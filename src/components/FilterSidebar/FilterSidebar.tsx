import CategoryTabs from "@/components/FilterSidebar/CategoryTabs";
import CustomSelect from "@/components/FilterSidebar/CustomSelect";
import CurrencySwitch from "@/components/FilterSidebar/CurrencySwitch";
import MultiSelect from "@/components/FilterSidebar/MultiSelect";
import ModelMultiSelect from "@/components/FilterSidebar/ModelMultiSelect";

import type { FilterValues } from "@/features/filters/types/filters";

import { useCategories, useManufacturers, useModels } from "@/features/filters/hooks/useFilters";

import CarIcon from "@/assets/icons/categories/car.svg?react";
import TractorIcon from "@/assets/icons/categories/tractor.svg?react";
import MotoIcon from "@/assets/icons/categories/moto.svg?react";

const items = [
  { id: "car", Icon: CarIcon, width: 30, height: 14 },
  { id: "tractor", Icon: TractorIcon, width: 22, height: 18 },
  { id: "moto", Icon: MotoIcon, width: 31, height: 20 },
];

type Props = {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  resultCounts?: number;
  onSearch: () => void;
  isFetchingCount: boolean;
};

type ModelGroup = {
  manId: string;
  manName: string;
  models: { id: string; name: string }[];
};


const FilterSidebar = ({
  activeTab,
  onChangeTab,
  filters,
  setFilters,
  resultCounts,
  onSearch,
  isFetchingCount,
}: Props) => {
  const { data: mansData } = useManufacturers();

  const modelsByMan = useModels(filters.Mans);

  let modelGroups: ModelGroup[] = [];

  if (mansData && modelsByMan.length > 0) {
    modelGroups = modelsByMan.map(({ manId, models }) => {
      const man = mansData.find((m: any) => String(m.man_id) === manId);

      return {
        manId,
        manName: man?.man_name ?? "",
        models: models.map((m: any) => ({
          id: String(m.model_id),
          name: m.model_name,
        })),
      };
    });
  }

  const modelSelectedValues = Object.entries(filters.ModelIds).flatMap(
    ([manId, ids]) => (ids as string[]).map((id) => `${manId}:${id}`)
  );

  const { data: catsData } = useCategories();

  const handleChange = (key: keyof FilterValues, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const dealTypes = [
    { label: "იყიდება", value: "0" },
    { label: "ქირავდება", value: "1" },
  ];

  const manufacturers = [
    { label: "ყველა მწარმოებელი", value: "" },
    ...(mansData
      ? mansData.map((m: any) => ({
          label: m.man_name,
          value: String(m.man_id),
        }))
      : []),
  ];

  const categories = catsData
    ? catsData.map((c: any) => ({
        label: c.title,
        value: String(c.category_id),
      }))
    : [];

  return (
    <aside className="md:w-[298px] bg-white border border-[#E2E5EB] rounded-t-[12px] rounded-b-none shadow-md">
      <CategoryTabs
        items={items}
        activeTab={activeTab}
        onChange={(tab) => {
          onChangeTab(tab);
          setFilters({
            ...filters,
            CategoryTab: tab,
            Cats: [],
          });
        }}
      />

      <div className="flex flex-col gap-y-4 px-6 pt-6 pb-6 border-b border-[#E9E9F0]">
        <CustomSelect
          label="გარიგების ტიპის"
          value={filters.ForRent}
          onChange={(val) => handleChange("ForRent", val)}
          options={dealTypes}
        />

        <MultiSelect
          label="მწარმოებელი"
          value={filters.Mans}
          onChange={(vals) => {
            setFilters((prev) => ({
              ...prev,
              Mans: vals,
              ModelIds: {},
            }));
          }}
          options={manufacturers.slice(1)} 
          placeholder="ყველა"
        />

        <ModelMultiSelect
          label="მოდელი"
          groups={modelGroups}
          value={modelSelectedValues}
          onChange={(vals) => {
            const next: Record<string, string[]> = {};

            vals.forEach((encoded) => {
              const [manId, modelId] = encoded.split(":");
              if (!manId || !modelId) return;
              if (!next[manId]) next[manId] = [];
              next[manId].push(modelId);
            });

            setFilters((prev) => ({ ...prev, ModelIds: next }));
          }}
          disabled={!filters.Mans.length}
        />

        <MultiSelect
          label="კატეგორია"
          value={filters.Cats}
          onChange={(vals) => setFilters({ ...filters, Cats: vals })}
          options={categories}
        />
      </div>

      <div className="flex flex-col gap-3 px-6 pt-5 pb-5">
        <div className="flex items-center justify-between w-full">
          <label className="font-medium text-[13px] text-left">ფასი</label>

          <CurrencySwitch
            value={filters.Currency}
            onChange={(ccy) => setFilters({ ...filters, Currency: ccy })}
          />
        </div>

        <div className="flex w-full h-[40px] items-center gap-1">
          <input
            type="number"
            placeholder="დან"
            value={filters.PriceFrom}
            className="w-[94px] h-[40px] border border-[#D8DBE2] rounded-[8px] text-[14px] text-[#8C929B] px-[10px]"
            onChange={(e) => handleChange("PriceFrom", e.target.value)}
          />

          <div className="w-[6px] h-[2px] bg-[#8C929B] rounded-full" />

          <input
            type="number"
            placeholder="მდე"
            value={filters.PriceTo}
            className="w-[94px] h-[40px] border border-[#D8DBE2] rounded-[8px] text-[14px] text-[#8C929B] px-[10px]"
            onChange={(e) => handleChange("PriceTo", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-[68px] bg-white px-6">
        <button
          className="w-[202px] h-[32px] bg-[#FD4100] rounded-[6px] font-bold text-[14px] text-white flex items-center justify-center gap-1"
          onClick={onSearch}
        >
          ძებნა{" "}
          {isFetchingCount ? (
            <span className="flex gap-0.5 ml-1">
              <span className="search-dot">•</span>
              <span className="search-dot">•</span>
              <span className="search-dot">•</span>
            </span>
          ) : (
            resultCounts?.toLocaleString("ka-GE")
          )}
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
