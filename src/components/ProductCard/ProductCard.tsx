import { buildImageUrl } from "@/config/api";
import { useManufacturers } from "@/features/filters/hooks/useFilters";
import type { Product } from "@/features/products/types/product";
import { buildManufacturersMap } from "./utils/buildManufacturersMap";
import { getDisplayName } from "./utils/getDisplayName";
import { getPrice } from "./utils/getPrice";
import { getCustomsInfo } from "./utils/getCustomsInfo";
import { getLocation } from "./utils/getLocation";
import { buildSpecs } from "./utils/buildSpecs";
import { formatDaysAgo } from "./utils/formatDaysAgo";

import CheckIcon from "@/assets/icons/check.svg?react";
import EngineIcon from "@/assets/icons/specs/engine.svg?react";
import MileageIcon from "@/assets/icons/specs/mileage.svg?react";
import TransmissionIcon from "@/assets/icons/specs/transmission.svg?react";
import DriveIcon from "@/assets/icons/specs/drive.svg?react";
import GELIcon from "@/assets/icons/currencies/gel.svg?react";
import USDIcon from "@/assets/icons/currencies/usd.svg?react";
import EditIcon from "@/assets/icons/actions/edit.svg?react";
import CompareIcon from "@/assets/icons/actions/compare.svg?react";
import FavoriteIcon from "@/assets/icons/actions/favorite.svg?react";
import HotIcon from "@/assets/icons/hot.svg?react";

import type { Currency } from "@/features/filters/types/filters";

type Props = {
    product: Product;
    currency: Currency;
};

export function ProductCard({ product, currency }: Props) {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const { data: mans } = useManufacturers();
    const manufacturersMap = buildManufacturersMap(mans);

    const img = buildImageUrl(product.photo, product.car_id, product.photo_ver);

    const displayName = getDisplayName(product, manufacturersMap);
    const { isCustom, label: customLabel } = getCustomsInfo(product);
    const { formatted: formattedPrice } = getPrice(product, currency);

    const CurrencyIcon = currency === "USD" ? USDIcon : GELIcon;

    const location = getLocation(product);

    const specs = buildSpecs(
    product,
    isMobile,
    location,
    EngineIcon,
    MileageIcon,
    TransmissionIcon,
    DriveIcon
    );

    const totalViews = product.views ?? 0;
    const daysAgo = formatDaysAgo(product.daily_views?.insert_Date);

    const isHighlighted = !!product.prom_color;

    return (
        <div
            className={`flex flex-col items-start md:flex-row md:p-[16px] transition-opacity duration-700 ease-in-out
            w-full
            p-5
            gap-4
            ${isHighlighted ? "bg-[#F0F9F7] border-[#59D8C9]" : "bg-white"}
            md:rounded-[14px]
            md:border
            md:p-4
            `}
        >

            <div className="md:hidden flex flex-col w-full gap-4">
            <div className="flex gap-2">
                <p className="text-[14px] text-[#272A37] font-medium">{displayName}</p>
                <p className="text-[14px] text-[#8C929B] font-medium">{product.prod_year} წ</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="flex text-[20px] font-medium text-[#272A37]">
                    {formattedPrice}
                    </span>
                    <div className="flex items-center justify-center w-[26px] h-[24px] rounded-full bg-[#F2F3F6]">
                    <CurrencyIcon className="text-[#272A37]" />
                    </div>
                </div>
                <div
                    className={`flex gap-2 items-center text-[11px] font-medium bg-[#EEFBF1] py-2 px-4 rounded-[6px] ${
                    isCustom ? "text-[#26B753]" : "text-[#FF3B30]"
                    }`}
                >
                    {isCustom && (
                    <span className="flex items-center">
                        <CheckIcon className="w-[7px] h-[6px]" />
                    </span>
                    )}
                    {customLabel}
                </div>
            </div>

            </div>

            <div className="relative w-full h-[256px] flex-none rounded-[8px] overflow-hidden md:w-[182px] md:h-[140px]">

        <img
        src={img}
        alt={displayName}
        className="w-full h-full object-cover"
        />

        <button
        className="absolute top-3 right-3 md:block"
        >
        <FavoriteIcon className="w-[28px] h-[28px] text-white" />
        </button>

        </div>

        <div className="flex flex-col w-full gap-[20px] ">
            <div className="md:flex justify-between w-full hidden">
            <div className="flex gap-2">
                <p className="text-[14px] text-[#272A37] font-medium">{displayName}</p>
                <p className="text-[14px] text-[#8C929B] font-medium">{product.prod_year} წ</p>
            </div>

            <div className="flex gap-4">
            <p
                className={`flex gap-1 items-center text-[11px] font-medium ${
                isCustom ? "text-[#26B753]" : "text-[#FF3B30]"
                }`}
            >
                {isCustom && (
                <span className="flex items-center gap-1">
                    <CheckIcon className="w-[7px] h-[6px]" />
                    {customLabel}
                </span>
                )}
            </p>
            <div className="flex items-center gap-1">
                <img src={location.flag} alt={location.label} className="w-[16px] h-[16px]" />

                <p className="text-[12px] text-[#6F7383] font-normal max-w-[95px] truncate">
                {location.label}
                </p>
            </div>
            </div>
        </div>

        <div className="w-full md:flex md:justify-between md:items-start">
            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
            {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2">

                {spec.type === "normal" && spec.icon && (
                <>
                    <spec.icon className="w-[18px] h-[18px] text-[#8C929B]" />
                    <span className="text-[14px] text-[#272A37]">{spec.value}</span>
                </>
                )}

                {spec.type === "body" && (
                <span className="text-[14px] text-[#272A37] md:hidden">
                    {spec.value}
                </span>
                )}

                {spec.type === "location" && (
                <div className="flex items-center gap-2 md:hidden">
                    <img src={spec.flag} className="w-[16px] h-[16px]" />
                    <span className="text-[14px] text-[#272A37]">{spec.value}</span>
                </div>
                )}
            </div>
            ))}
        </div>
            <div className="md:flex items-center gap-2 hidden">
                <span className="flex text-[20px] font-medium text-[#272A37]">
                {formattedPrice}
                </span>
                <div className="flex items-center justify-center w-[26px] h-[24px] rounded-full bg-[#F2F3F6]">
                <CurrencyIcon className="text-[#272A37]" />
                </div>
            </div>
        </div>

        <div className="flex justify-between w-full items-center border-t pt-2 md:border-0 md:pt-0">
            <div className="mt-2 flex items-center gap-2 text-[12px] text-[#6F7383] md:gap-1">
                <HotIcon className="block md:hidden" />

                <span>{totalViews.toLocaleString("ka-GE")} ნახვა</span>

                {daysAgo && (
                <>
                    <span className="mx-1">•</span>
                    <span>{daysAgo}</span>
                </>
                )}
            </div>
            <div className="flex gap-4 items-center">
                <EditIcon className="w-[24px] h-[24px] md:w-[12px] md:h-[12px]" />
                <CompareIcon className="w-[24px] h-[24px] md:w-[12px] md:h-[12px]" />
                <FavoriteIcon className="hidden md:flex md:w-[12px] md:h-[12px]" />
            </div>
        </div>

        </div>
    </div>
    );
}
