import SortSelect from "./SortSelect";

type Props = {
  total: number | undefined;
  isFetchingCount: boolean;
  period: string;
  sortOrder: string;
  onPeriodChange: (v: string) => void;
  onSortChange: (v: string) => void;
};

const PERIOD_OPTIONS = [
  { label: "1 საათი", value: "1h" },
  { label: "3 საათი", value: "3h" },
  { label: "6 საათი", value: "6h" },
  { label: "12 საათი", value: "12h" },
  { label: "24 საათი", value: "1d" },
];

const SORT_OPTIONS = [
  { label: "თარიღი კლებადობით", value: "1" },
  { label: "თარიღი ზრდადობით", value: "2" },
  { label: "ფასი კლებადობით", value: "3" },
  { label: "ფასი ზრდადობით", value: "4" },
  { label: "გარბენი კლებადობით", value: "5" },
  { label: "გარბენი ზრდადობით", value: "6" },
];

export default function SortTopBar({
  total,
  isFetchingCount,
  period,
  sortOrder,
  onPeriodChange,
  onSortChange,
}: Props) {
  return (
    <div className="w-full flex justify-between items-center bg-transparent">
      
      <div className="text-[16px] text-[#272A37] font-medium flex items-center gap-1">
        {isFetchingCount ? (
          <span className="flex gap-0.5">
            <span className="search-dot">•</span>
            <span className="search-dot">•</span>
            <span className="search-dot">•</span>
          </span>
        ) : (
          <span>{total?.toLocaleString("ka-GE") ?? 0}</span>
        )}

        <span> განცხადება</span>
      </div>

      <div className="flex items-center gap-3">
        <SortSelect
          value={period}
          onChange={onPeriodChange}
          options={PERIOD_OPTIONS}
          placeholder="პერიოდი"
        />

        <SortSelect
          value={sortOrder}
          onChange={onSortChange}
          options={SORT_OPTIONS}
          placeholder="სორტირება"
        />
      </div>
    </div>
  );
}
