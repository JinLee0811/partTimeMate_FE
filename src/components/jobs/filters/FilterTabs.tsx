import React from "react";

interface FilterTabsProps {
  activeTab: "Job Category" | "Location" | "Work Period" | "Detail";
  setActiveTab: (tab: "Job Category" | "Location" | "Work Period" | "Detail") => void;
  counts: {
    "Job Category": number;
    Location: number;
    "Work Period": number;
    Detail: number;
  };
}

const tabsData: Array<{
  key: "Job Category" | "Location" | "Work Period" | "Detail";
  label: string;
}> = [
  { key: "Job Category", label: "Job Category" },
  { key: "Location", label: "Location" },
  { key: "Work Period", label: "Work Period" },
  { key: "Detail", label: "Detail" },
];

export default function FilterTabs({ activeTab, setActiveTab, counts }: FilterTabsProps) {
  return (
    <div className='flex space-x-2 mb-4'>
      {tabsData.map((tab) => {
        const isActive = activeTab === tab.key;
        const count = counts[tab.key];
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              relative flex items-center px-4 py-2 rounded-md border
              transition-colors font-semibold
              ${
                isActive
                  ? "border-2 border-black bg-white text-black"
                  : "border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}>
            {tab.label}
            {count > 0 && (
              <span className='ml-2 px-2 py-0.5 text-xs leading-none rounded-full bg-orange-600 text-white'>
                {count}
              </span>
            )}
            {isActive && <span className='ml-2 text-sm'>▲</span>}
          </button>
        );
      })}
    </div>
  );
}
