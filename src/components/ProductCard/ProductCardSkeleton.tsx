const ProductCardSkeleton = () => {
    return (
    <div className="w-full h-[180px] bg-white rounded-[12px] shadow-sm border border-[#E5E7EB] p-5 flex gap-6 animate-pulse">
        
        <div className="w-[220px] h-full bg-[#F2F3F6] rounded-[10px]" />

        <div className="flex-1 flex justify-between">
        
        <div className="flex flex-col gap-3 mt-1">
            <div className="w-[180px] h-[14px] bg-[#F2F3F6] rounded-lg" />

            <div className="flex gap-4">
            <div className="w-[100px] h-[10px] bg-[#F2F3F6] rounded-lg" />
            <div className="w-[100px] h-[10px] bg-[#F2F3F6] rounded-lg" />
            </div>

            <div className="flex gap-4">
            <div className="w-[100px] h-[10px] bg-[#F2F3F6] rounded-lg" />
            <div className="w-[100px] h-[10px] bg-[#F2F3F6] rounded-lg" />
            </div>
        </div>

        <div className="flex flex-col items-end gap-3 mt-1">
            <div className="w-[70px] h-[10px] bg-[#F2F3F6] rounded-lg" />
            <div className="w-[100px] h-[14px] bg-[#F2F3F6] rounded-lg" />
        </div>
        </div>
    </div>
    );
};


export default ProductCardSkeleton;
