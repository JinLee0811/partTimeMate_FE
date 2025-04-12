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
import { locations } from "../../../data/locations";

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
    <div className='max-w-5xl mx-auto bg-white border border-gray-300 rounded-md shadow p-6'>
      {/* 1) Top Header: FilterTabs & Selected/Max Filters Count */}
      <div className='flex items-center justify-between mb-4'>
        <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />
        <div className='text-gray-500 text-sm'>
          {totalSelectedFilters}/{MAX_FILTERS}
        </div>
      </div>

      {/* 2) Search Input & Exclude Bar Checkbox */}
      {(activeTab === "Job Category" || activeTab === "Location") && (
        <div className='flex items-center space-x-4 mb-4'>
          <div className='w-96'>
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              onSearch={handleSearch}
              placeholder={getPlaceholder()}
            />
          </div>
          {activeTab === "Job Category" && (
            <label className='flex items-center text-sm text-gray-700 gap-1'>
              <input
                type='checkbox'
                className='form-checkbox'
                checked={excludeBar}
                onChange={() => setExcludeBar(!excludeBar)}
              />
              <span>Exclude Bar</span>
            </label>
          )}
        </div>
      )}

      {/* 3) Filter Component According to Active Tab */}
      <div className='border-t border-gray-200 pt-4'>
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
          <WorkPeriodFilter
            selectedPeriods={selectedPeriods}
            setSelectedPeriods={setSelectedPeriods}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            selectedHours={selectedHours}
            setSelectedHours={setSelectedHours}
          />
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
      <div className='mt-4'>
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
      <div className='mt-6'>
        <ResetButton onReset={resetFilters} />
      </div>
    </div>
  );
}
