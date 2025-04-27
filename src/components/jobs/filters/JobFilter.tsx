import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";
import WorkPeriodFilter from "./WorkPeriodFilter";
import DetailFilter from "./DetailsFilter";
import FilterTabs from "./FilterTabs";
import SelectedFilters from "./SelectedFilters";
import ResetButton from "./ResetButton";
import SearchInput from "./SearchInput";
import { locations } from "../../../Mockdata/locations";

const MAX_FILTERS = 10;

export default function JobFilterPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<
    "Job Category" | "Location" | "Work Period" | "Detail"
  >("Job Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [excludeBar, setExcludeBar] = useState(false);

  // 필터 상태들
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  // Work Period 더보기 상태
  const [showAllPeriods, setShowAllPeriods] = useState(false);

  // URL 파라미터에서 지역 정보를 읽어와 자동으로 선택
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationParam = params.get("location");

    if (locationParam) {
      const formattedLocation = locationParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const regionExists = locations.some(
        (region) => region.name.toLowerCase() === formattedLocation.toLowerCase()
      );

      if (regionExists) {
        const allLocationName = `${formattedLocation} - All`;
        if (!selectedLocations.includes(allLocationName)) {
          setSelectedLocations([allLocationName]);
        }
        setActiveTab("Location");
      }
    }
  }, [location.search]);

  // 전체 선택된 필터 개수
  const totalSelectedFilters =
    selectedCategories.length +
    selectedLocations.length +
    selectedPeriods.length +
    selectedDays.length +
    selectedHours.length +
    selectedDetails.length;

  // 추가 필터 선택 가능 여부
  const canAddMoreFilters = totalSelectedFilters < MAX_FILTERS;

  // 전체 필터 초기화
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedPeriods([]);
    setSelectedDays([]);
    setSelectedHours([]);
    setSelectedDetails([]);
    setSearchQuery("");
    setSearchActive(false);
    setExcludeBar(false);
  };

  const counts = {
    "Job Category": selectedCategories.length,
    Location: selectedLocations.length,
    "Work Period": selectedPeriods.length + selectedDays.length + selectedHours.length,
    Detail: selectedDetails.length,
  };

  // 각 탭에 따라 다른 placeholder를 지정
  const getPlaceholder = () => {
    if (activeTab === "Job Category") {
      return "Search categories (e.g., barista, cashier)";
    } else if (activeTab === "Location") {
      return "Search locations (e.g., Townhall, Wynyard )";
    } else {
      return "";
    }
  };

  // 검색 실행
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSearchActive(true);
    }
  };

  // 검색어 변경 시 검색 활성화 상태 초기화
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSearchActive(false);
  };

  // 필터 제거 핸들러
  const handleRemoveFilter = (filter: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== filter));
    setSelectedLocations(selectedLocations.filter((l) => l !== filter));
    setSelectedPeriods(selectedPeriods.filter((p) => p !== filter));
    setSelectedDays(selectedDays.filter((d) => d !== filter));
    setSelectedHours(selectedHours.filter((h) => h !== filter));
    setSelectedDetails(selectedDetails.filter((d) => d !== filter));
  };

  return (
    <div className='max-w-md md:max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-2 md:p-6 text-xs md:text-base'>
      {/* 1) Top Header: FilterTabs & Selected/Max Filters Count */}
      <div className='flex gap-1 md:gap-4 overflow-x-auto mb-2 md:mb-4'>
        {["Job Category", "Location", "Work Period", "Detail"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition
              ${activeTab === tab ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setActiveTab(tab as any)}>
            {tab}
            {counts[tab as keyof typeof counts] > 0 && (
              <span className='ml-1 text-orange-500'>{counts[tab as keyof typeof counts]}</span>
            )}
          </button>
        ))}
        <span className='ml-auto text-gray-400 text-xs md:text-sm flex-shrink-0'>
          {totalSelectedFilters}/{MAX_FILTERS}
        </span>
      </div>

      {/* 2) Search Input & Exclude Bar Checkbox */}
      {(activeTab === "Job Category" || activeTab === "Location") && (
        <div className='flex items-center space-x-2 md:space-x-4 mb-2 md:mb-4'>
          <div className='flex-1 min-w-0'>
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              onSearch={handleSearch}
              placeholder={getPlaceholder()}
            />
          </div>
          {activeTab === "Job Category" && (
            <label className='flex items-center text-xs md:text-sm text-gray-700 gap-1'>
              <input
                type='checkbox'
                className='form-checkbox h-4 w-4'
                checked={excludeBar}
                onChange={() => setExcludeBar(!excludeBar)}
              />
              <span>Exclude Bar</span>
            </label>
          )}
        </div>
      )}

      {/* 3) Filter Component According to Active Tab */}
      <div className='border-t border-gray-200 pt-2 md:pt-4'>
        {activeTab === "Job Category" && (
          <CategoryFilter
            searchQuery={searchQuery}
            excludeBar={excludeBar}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            searchActive={searchActive}
            canAddMoreFilters={canAddMoreFilters}
          />
        )}
        {activeTab === "Location" && (
          <LocationFilter
            searchQuery={searchQuery}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            searchActive={searchActive}
            canAddMoreFilters={canAddMoreFilters}
          />
        )}
        {activeTab === "Work Period" && (
          <div>
            <WorkPeriodFilter
              selectedPeriods={showAllPeriods ? selectedPeriods : selectedPeriods.slice(0, 6)}
              setSelectedPeriods={setSelectedPeriods}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              selectedHours={selectedHours}
              setSelectedHours={setSelectedHours}
            />
            {/* 더보기 버튼 (모바일에서만) */}
            {selectedPeriods.length > 6 && (
              <button
                className='block md:hidden mt-2 mx-auto px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200'
                onClick={() => setShowAllPeriods((prev) => !prev)}>
                {showAllPeriods ? "간단히 보기" : "더보기"}
              </button>
            )}
          </div>
        )}
        {activeTab === "Detail" && (
          <DetailFilter
            selectedFilters={selectedDetails}
            setSelectedFilters={setSelectedDetails}
            canAddMoreFilters={canAddMoreFilters}
          />
        )}
      </div>

      {/* 4) Selected Filters Display */}
      <div className='mt-2 md:mt-4'>
        <SelectedFilters
          selectedFilters={[
            ...selectedCategories,
            ...selectedLocations,
            ...selectedPeriods,
            ...selectedDays,
            ...selectedHours,
            ...selectedDetails,
          ]}
          onRemoveFilter={handleRemoveFilter}
        />
      </div>

      {/* 5) Reset Button */}
      <div className='mt-4 md:mt-6'>
        <ResetButton onReset={resetFilters} />
      </div>
    </div>
  );
}
