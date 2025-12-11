import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
};

export default function SortSelect({ value, onChange, options, placeholder = "არჩევა" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const selected =
    value !== ""
      ? options.find((o) => o.value === value)?.label
      : placeholder;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full h-[40px] border border-[#E2E5EB] rounded-[8px]
                   bg-white px-[12px] text-[14px] text-[#6F7383]
                   flex items-center justify-between"
      >
        {selected}
        <span className="text-[#6F7383]">▾</span>
      </button>

      {open && (
        <div
          className="absolute top-[45px] left-0 bg-white 
                      rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                      border border-[#EDEDED] z-50
                      w-fit min-w-[180px] py-[6px]"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-[12px] py-[10px] text-[14px] text-[#1B1B1B] whitespace-nowrap
                ${
                  opt.value === value
                    ? "bg-[#F2F3F6] font-medium"
                    : "hover:bg-[#F7F7F8]"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
