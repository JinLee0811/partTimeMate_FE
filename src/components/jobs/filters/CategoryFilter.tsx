import { useState, useEffect } from "react";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { FaCheck } from "react-icons/fa";

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  searchQuery: string;
  excludeBar: boolean;
  searchActive: boolean;
  canAddMoreFilters: boolean;
}

export default function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
  searchQuery,
  excludeBar,
  searchActive,
  canAddMoreFilters,
}: CategoryFilterProps) {
  const { categories, subcategories, fetchCategories } = useCategoryStore();
  const [activeCategory, setActiveCategory] = useState<number>(categories[0]?.id || 0);

  // 컴포넌트 마운트 시 카테고리 데이터를 API에서 불러옴
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // categories가 업데이트되면 activeCategory를 첫 번째 카테고리로 설정
  useEffect(() => {
    if (categories.length && !categories.find((cat) => cat.id === activeCategory)) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const handleSelectCategory = (subcategoryName: string) => {
    // 이미 선택된 카테고리인 경우 제거
    if (selectedCategories.includes(subcategoryName)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== subcategoryName));
      return;
    }

    // 필터 제한에 도달한 경우 추가하지 않음
    if (!canAddMoreFilters) {
      return;
    }

    // 새로운 카테고리 추가
    setSelectedCategories([...selectedCategories, subcategoryName]);
  };

  // 검색어와 excludeBar 옵션을 기반으로 필터링된 서브카테고리 목록을 생성
  // 모든 대분류의 소분류에서 검색
  const filteredSubcategories = Object.entries(subcategories).flatMap(([categoryId, subs]) => {
    return subs.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      const matchesExcludeBar = excludeBar ? !sub.name.toLowerCase().includes("bar") : true;
      return matchesSearch && matchesExcludeBar;
    });
  });

  // 검색 결과가 있을 때 해당 카테고리를 활성화
  useEffect(() => {
    if (searchActive && searchQuery && filteredSubcategories.length > 0) {
      const categoryId = parseInt(
        Object.keys(subcategories).find((key) =>
          subcategories[parseInt(key)].some(
            (sub: { name: string }) =>
              sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              sub.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
        ) || "0"
      );

      if (categoryId && categories.some((cat) => cat.id === categoryId)) {
        setActiveCategory(categoryId);
      }
    }
  }, [searchActive, searchQuery, filteredSubcategories, categories, subcategories]);

  return (
    <div className='border border-gray-200 rounded-md p-4 bg-white'>
      {searchActive && searchQuery ? (
        <div className='max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {filteredSubcategories.length > 0 ? (
            filteredSubcategories.map((sub) => {
              const isSelected = selectedCategories.includes(sub.name);
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSelectCategory(sub.name)}
                  className={`
                    cursor-pointer flex items-center p-2 transition
                    ${isSelected ? "text-orange-500 font-semibold" : "text-gray-700"}
                    hover:bg-gray-100
                    ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}
                  `}>
                  <span>{sub.name}</span>
                  {isSelected && <FaCheck className='text-orange-500 ml-1' />}
                </div>
              );
            })
          ) : (
            <div className='text-gray-500 text-center py-4'>검색 결과가 없습니다.</div>
          )}
        </div>
      ) : (
        <div className='grid grid-cols-[30%_70%] gap-4'>
          {/* Left Panel: Main Categories */}
          <div className='border-r pr-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`
                  cursor-pointer p-2 transition
                  ${
                    activeCategory === category.id
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  }
                `}
                onClick={() => setActiveCategory(category.id)}>
                {category.name}
              </div>
            ))}
          </div>

          {/* Right Panel: Subcategories */}
          <div className='max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {(subcategories[activeCategory] || []).map((sub) => {
              const isSelected = selectedCategories.includes(sub.name);
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSelectCategory(sub.name)}
                  className={`
                    cursor-pointer flex items-center p-2 transition
                    ${isSelected ? "text-orange-500 font-semibold" : "text-gray-700"}
                    hover:text-orange-500
                    ${!isSelected && !canAddMoreFilters ? "opacity-50 cursor-not-allowed" : ""}
                  `}>
                  <span>{sub.name}</span>
                  {isSelected && <FaCheck className='text-orange-500 ml-1' />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
