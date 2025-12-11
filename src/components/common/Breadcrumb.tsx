type Props = {
    forRent: string;
};

const Breadcrumb = ({ forRent }: Props) => {
    return (
    <nav className="flex items-center text-[12px] text-[#9399A3] gap-1 mb-4">
        <span className="cursor-pointer hover:underline">მთავარი</span>
        <span>{">"}</span>

        <span className="cursor-pointer hover:underline">ძიება</span>
        <span>{">"}</span>

        <span className="text-[#FF5E00] font-medium">
        {forRent === "1" ? "დაგირავება" : "იყიდება"}
        </span>
    </nav>
    );
};

export default Breadcrumb;
