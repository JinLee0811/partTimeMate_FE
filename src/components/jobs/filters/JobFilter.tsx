import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";
import WorkPeriodFilter from "./WorkPeriodFilter";
import DetailFilter from "./DetailsFilter";
import FilterTabs from "./FilterTabs";
import SelectedFilters from "./SelectedFilters";
import ResetButton from "./ResetButton";
import SearchInput from "./SearchInput";

export default function JobFilterPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("업직종");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 전체 필터 초기화
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedPeriods([]);
    setSelectedDetails([]);
  };

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white border rounded-md border-gray-300'>
      <h2 className='text-2xl font-bold mb-6'>Filtering</h2>

      {/* 검색창 */}
      <SearchInput
        placeholder='Search...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 필터 탭 */}
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 선택된 필터에 따라 UI 렌더링 */}
      {activeTab === "업직종" && (
        <CategoryFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      )}
      {activeTab === "지역" && (
        <LocationFilter
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      )}
      {activeTab === "근무기간" && (
        <WorkPeriodFilter
          selectedFilters={selectedPeriods}
          setSelectedFilters={setSelectedPeriods}
        />
      )}
      {activeTab === "상세조건" && (
        <DetailFilter selectedFilters={selectedDetails} setSelectedFilters={setSelectedDetails} />
      )}

      {/* 선택된 필터들 표시 */}
      <SelectedFilters
        selectedFilters={[
          ...selectedCategories,
          ...selectedLocations,
          ...selectedPeriods,
          ...selectedDetails,
        ]}
        onRemoveFilter={(filter) => {
          setSelectedCategories(selectedCategories.filter((c) => c !== filter));
          setSelectedLocations(selectedLocations.filter((c) => c !== filter));
          setSelectedPeriods(selectedPeriods.filter((c) => c !== filter));
          setSelectedDetails(selectedDetails.filter((c) => c !== filter));
        }}
      />

      {/* 초기화 버튼 */}
      <div className='mt-4'>
        <ResetButton onReset={resetFilters} />
      </div>
    </div>
  );
}
