import React from 'react'

type TabItem = {
  id: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  width: number;
  height: number;
}

type Props = {
  activeTab: string;
  onChange: (id: string) => void;
  items: TabItem[];
}

const CategoryTabs = ({ activeTab, onChange, items }: Props) => {
  return (
    <div className="grid grid-cols-3 bg-[#F9F9FB] rounded-t-[12px] overflow-hidden">
      {items.map(({id, Icon, width, height}) => {
        const isActive = id === activeTab;

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="h-[56px] w-full flex items-center justify-center
                      relative border-r last:border-r-0 border-[#E9E9F0]"
          >
            <Icon width={width} height={height} className={isActive ? "text-[#FD4100]" : "text-[#8C929B]"} />
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FD4100]" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs