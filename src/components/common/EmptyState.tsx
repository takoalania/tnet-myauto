type EmptyStateProps = {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    onClick?: () => void;
};

export const EmptyState = ({
    title = "განცხადებები ვერ მოიძებნა",
    subtitle = "შენი ძებნის პარამეტრების მიხედვით განცხადებები ვერ მოიძებნა. შეცვალე ან გამოიწერე პარამეტრები და მიიღე შეტყობინება ახალი განცხადებების განთავსების შემთხვევაში",
    buttonText = "გასუფთავება",
    onClick,
}: EmptyStateProps) => {
    return (
    <div className="flex flex-col items-center py-[80px] px-[20px] md:px-[0px]">
        <img
            src="/empty-alert.svg"
            alt="empty-alert"
            className="mb-[32px]"
        />

        <p className="text-raisin-100 font-bold text-[18px] mb-[16px]">
            {title}
        </p>

        <p className="text-center text-raisin-100 text-[14px] mb-[32px]">
            {subtitle}
        </p>

        <button
            onClick={onClick}
            className="flex items-center px-[24px] bg-[#FD4100] h-[54px] rounded-[10px] 
                        text-white font-medium text-[12px] border-0 cursor-pointer"
        >
            {buttonText}
        </button>
    </div>
    );
};
