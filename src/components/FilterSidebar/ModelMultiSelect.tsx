import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

type ModelGroup = {
  manId: string;
  manName: string;
  models: { id: string; name: string }[];
};

type Props = {
  label: string;
  groups: ModelGroup[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
};

const ModelMultiSelect = ({
  label,
  groups,
  value,
  onChange,
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(value);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    width: 0,
  });

  const dropdownRoot = document.getElementById("dropdown-root");

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const openDropdown = () => {
    if (disabled) return;

    const el = triggerRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setRect({
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        width: r.width,
      });
    }

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

  const selectedLabels = groups
    .flatMap((group) =>
      group.models
        .filter((m) => draft.includes(`${group.manId}:${m.id}`))
        .map((m) => m.name)
    );

  const displayText =
    selectedLabels.length === 0 ? "ყველა" : selectedLabels.join(", ");

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
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }
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
          <div>
            <div className="fixed inset-0 z-40" onClick={closeDropdown} />

            <div
              className="
                fixed z-50 bg-white border border-[#E2E5EB]
                rounded-[12px] shadow-md
              "
              style={{
                width: rect.width,
                left: rect.left,
                top: rect.bottom + 4,
                maxHeight: "45vh",
              }}
            >
              <div
                className="px-4 pt-3 pb-2 space-y-3 overflow-y-auto"
                style={{ maxHeight: "calc(45vh - 50px)" }}
              >
                {groups.map((group) => (
                  <div key={group.manId}>
                    <div className="text-[13px] font-semibold text-[#5A5A6E] mb-1">
                      {group.manName}
                    </div>

                    {group.models.map((model) => {
                      const encoded = `${group.manId}:${model.id}`;
                      const checked = draft.includes(encoded);

                      return (
                        <button
                          key={encoded}
                          type="button"
                          onClick={() => toggle(encoded)}
                          className="
                            flex items-center gap-3 w-full text-left
                            px-1 py-1.5 rounded-[6px] hover:bg-[#F5F6FA]
                          "
                        >
                          <span
                            className={`
                              flex items-center justify-center
                              w-[18px] h-[18px] rounded-[4px] border
                              ${
                                checked
                                  ? "bg-[#22C55E] border-[#22C55E]"
                                  : "bg-white border-[#C2C9D8]"
                              }
                            `}
                          >
                            {checked && (
                              <Check size={14} className="text-white" />
                            )}
                          </span>

                          <span className="text-[13px] text-[#1B1D25]">
                            {model.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="px-4 pb-3 pt-1">
                <button
                  type="button"
                  onClick={apply}
                  className="
                    w-full h-[36px] bg-[#111827]
                    rounded-[8px] text-white text-[13px] font-medium
                  "
                >
                  არჩევა
                </button>
              </div>
            </div>
          </div>,
          dropdownRoot
        )}
    </div>
  );
};

export default ModelMultiSelect;
