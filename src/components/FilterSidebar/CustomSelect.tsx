import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
};

const CustomSelect = ({ label, value, onChange, options, disabled }: Props) => {
  const isPlaceholder = value === "";

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[12px] font-medium text-[#272A37]">{label}</label>

      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            appearance-none w-full h-[40px]
            bg-white border border-[#C2C9D8] rounded-[8px]
            px-[12px] pr-[40px] text-[13px] font-medium
            outline-none cursor-pointer
            ${isPlaceholder ? "text-[#6F7383]" : "text-[#1B1D25]"}
          `}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className={opt.value === "" ? "text-[#6F7383]" : "text-[#1B1D25]"}
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <div className="pointer-events-none absolute top-1/2 right-[12px] -translate-y-1/2">
          <ChevronDown size={16} className="text-[#6F7383]" />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
