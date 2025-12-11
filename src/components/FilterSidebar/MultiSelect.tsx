import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

const MultiSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "ყველა",
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(value);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const [rect, setRect] = useState({
    bottom: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const openDropdown = () => {
    if (disabled) return;

    const el = triggerRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();

    setRect({
      bottom: r.bottom,
      left: r.left,
      width: r.width,
    });

    setOpen(true);
  };

  const closeDropdown = () => setOpen(false);

  const toggle = (val: string) => {
    setDraft((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const apply = () => {
    onChange(draft);
    closeDropdown();
  };

  const selectedLabels = options
    .filter((o) => draft.includes(String(o.value)))
    .map((o) => o.label);

  const displayText =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.join(", ");

  const dropdownRoot = document.getElementById("dropdown-root");

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[12px] font-medium text-[#272A37]">
        {label}
      </label>

      <button
        ref={triggerRef}
        type="button"
        onClick={openDropdown}
        disabled={disabled}
        className={`
          flex items-center justify-between
          w-full h-[40px] px-[12px] pr-[40px]
          bg-white border border-[#C2C9D8] rounded-[8px]
          text-[13px] font-medium
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`truncate ${
            selectedLabels.length === 0
              ? "text-[#6F7383]"
              : "text-[#1B1D25]"
          }`}
        >
          {displayText}
        </span>
        <ChevronDown size={16} className="text-[#6F7383]" />
      </button>

      {open &&
        dropdownRoot &&
        createPortal(
          <>
            <div className="fixed inset-0 z-40" onClick={closeDropdown} />

            <div
              className="
                fixed z-50 bg-white border border-[#E2E5EB]
                rounded-[12px] shadow-md flex flex-col
              "
              style={{
                width: rect.width,
                left: rect.left,
                top: rect.bottom + 4,
                maxHeight: `${window.innerHeight - rect.bottom - 20}px`,
              }}
            >
              <div
                className="px-4 pt-4 pb-2 space-y-2 overflow-y-auto"
                style={{
                  maxHeight: `${window.innerHeight - rect.bottom - 90}px`,
                }}
              >
                {options.map((opt) => {
                  const val = String(opt.value);
                  const checked = draft.includes(val);

                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => toggle(val)}
                      className="
                        flex items-center gap-3 w-full text-left
                        px-2 py-1.5 rounded-[8px] hover:bg-[#F5F6FA]
                      "
                    >
                      <span
                        className={`flex items-center justify-center
                          w-[18px] h-[18px] rounded-[4px] border
                          ${
                            checked
                              ? "bg-[#22C55E] border-[#22C55E]"
                              : "bg-white border-[#C2C9D8]"
                          }
                        `}
                      >
                        {checked && <Check size={14} className="text-white" />}
                      </span>

                      <span className="text-[13px] text-[#1B1D25]">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="px-4 pb-4 pt-2">
                <button
                  type="button"
                  onClick={apply}
                  className="
                    w-full h-[38px] bg-[#111827]
                    rounded-[10px] text-white text-[13px] font-medium
                  "
                >
                  არჩევა
                </button>
              </div>
            </div>
          </>,
          dropdownRoot
        )}
    </div>
  );
};

export default MultiSelect;
