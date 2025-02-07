import React, { useState } from "react";

const industries: Record<string, string[]> = {
  "Food & Beverage": ["Restaurant", "Cafe", "Bar", "Fast Food"],
  Retail: ["Supermarket", "Clothing Store", "Convenience Store"],
  Education: ["Tutoring", "Childcare"],
};

const IndustryFilter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const toggleJob = (job: string) => {
    setSelectedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  return (
    <div className='flex'>
      {/* 업종 대분류 */}
      <div className='w-1/3 border-r p-2'>
        {Object.keys(industries).map((category) => (
          <div
            key={category}
            className={`p-2 cursor-pointer ${selectedCategory === category ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedCategory(category)}>
            {category}
          </div>
        ))}
      </div>

      {/* 세부 업종 */}
      <div className='w-2/3 p-2'>
        {selectedCategory &&
          industries[selectedCategory]?.map((job) => (
            <div
              key={job}
              className={`p-2 cursor-pointer ${selectedJobs.includes(job) ? "bg-blue-200" : ""}`}
              onClick={() => toggleJob(job)}>
              {job}
            </div>
          ))}
      </div>
    </div>
  );
};

export default IndustryFilter;
