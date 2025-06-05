import { CaretDown } from "phosphor-react";
import React from "react";

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  options: {
    key: string | number;
    label: string;
    checked: boolean;
  }[];
  onOptionToggle: (key: string | number) => void;
  maxHeight?: string; // opcionalno (default: 300px)
}

const FilterGeneralComponent: React.FC<FilterSectionProps> = ({
  title,
  isOpen,
  onToggle,
  options,
  onOptionToggle,
  maxHeight,
}) => {
  return (
    <div className="w-full flex gap-4 flex-col">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-centes cursor-pointer"
      >
        <p className="text-xl font-medium text-[#E8E8E8]">{title}</p>
        <CaretDown color={"#E8E8E8"} size={30} />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden text-sm text-[#E8E8E8] flex flex-col gap-2   `}
        style={{ maxHeight: isOpen ? maxHeight : "0px" }}
      >
        <ul className="  p-4 space-y-1 text-sm text-[#E8E8E8] w-full bg-[#212121] rounded-[30px] pt-6  px-6 pb-6 overflow-clip shadow-LightBottom">
          {options.map((opt) => (
            <li
              key={opt.key}
              className="flex items-center justify-between py-2 border-b-1 border-[#6666664D] gap-2"
            >
              <label className="cursor-pointer hover:text-white text-sm font-medium ">
                {opt.label}
              </label>
              <label className="relative cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  checked={opt.checked}
                  onChange={() => onOptionToggle(opt.key)}
                  className="peer appearance-none w-5 h-5 rounded-sm border-1 
                 border-[#4a4a4a] bg-transparent 
                 checked:bg-[#3dd2cd6d] checked:border-[#3dd2cdf0]
                 transition-colors duration-300 flex items-center justify-center"
                />
                <svg
                  className="absolute left-0 w-5 h-5 text-[#212121] pointer-events-none hidden peer-checked:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterGeneralComponent;
