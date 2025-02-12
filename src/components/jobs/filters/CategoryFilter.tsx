import { useState } from "react";
import { jobCategories } from "../../../data/jobCategories";
import { FaCheck } from "react-icons/fa";

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export default function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>(jobCategories[0]?.id || "");

  const handleSelectCategory = (subcategory: string) => {
    setSelectedCategories(
      selectedCategories.includes(subcategory)
        ? selectedCategories.filter((c) => c !== subcategory)
        : [...selectedCategories, subcategory]
    );
  };

  return (
    <div className='border rounded-md p-4 bg-white'>
      <div className='grid grid-cols-[1fr_2fr] gap-4'>
        {/* 🏷️ 대분류 (스크롤 추가) */}
        <div className='border-r pr-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {jobCategories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer p-2 transition ${
                activeCategory === category.id
                  ? "text-red-500 font-bold bg-gray-100 rounded"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveCategory(category.id)}>
              {category.name}
            </div>
          ))}
        </div>

        {/* 🏷️ 소분류 (스크롤 추가) */}
        <div className='grid grid-cols-2 gap-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          {jobCategories
            .find((category) => category.id === activeCategory)
            ?.subcategories.map((sub) => (
              <div
                key={sub.id}
                className='cursor-pointer flex justify-between items-center p-2 transition text-gray-800 hover:bg-gray-200 rounded'
                onClick={() => handleSelectCategory(sub.name)}>
                <span
                  className={`${
                    selectedCategories.includes(sub.name)
                      ? "text-red-500 font-bold"
                      : "text-gray-800"
                  }`}>
                  {sub.name}
                </span>
                {selectedCategories.includes(sub.name) && <FaCheck className='text-blue-600' />}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
