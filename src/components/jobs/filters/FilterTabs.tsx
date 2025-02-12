interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FilterTabs({ activeTab, setActiveTab }: FilterTabsProps) {
  const tabs = ["업직종", "지역", "근무기간", "상세조건"];

  return (
    <div className='flex space-x-4 border-b pb-2 mb-4 mt-6'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-bold ${
            activeTab === tab ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"
          }`}
          onClick={() => setActiveTab(tab)}>
          {tab}
        </button>
      ))}
    </div>
  );
}
