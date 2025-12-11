import { TbCurrencyDollar, TbCurrencyLari } from 'react-icons/tb';
import type { Currency } from '@/features/filters/types/filters';

type Props = {
    value: Currency;
    onChange: (ccy: Currency) => void;
}

const CurrencySwitch = ({ value, onChange }: Props) => {

return (
    <div className="relative flex items-center w-[46px] h-[24px] rounded-[12px] border border-[#E2E5EB] bg-white">
        <button
            onClick={() => onChange("GEL")}
            className={`
                w-[24px] h-[24px]
                flex items-center justify-center
                rounded-full
                transition-colors
                ${value === "GEL" ? "bg-[#272A37] text-white" : "text-[#8C929B]"}
        `}>
            <TbCurrencyLari className="w-[10px] h-[10px]" />
        </button>

        <button
            onClick={() => onChange("USD")}
            className={`
                w-[24px] h-[24px]
                flex items-center justify-center
                rounded-full
                transition-colors
                ${value === "USD" ? "bg-[#272A37] text-white" : "text-[#8C929B]"}
        `}>
            <TbCurrencyDollar className="w-[10px] h-[10px]" />
        </button>
    </div>
)
}

export default CurrencySwitch