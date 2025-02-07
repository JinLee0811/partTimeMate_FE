import React, { useState } from "react";
import JobFilter from "../../components/jobs/JobFilter";
import FilterContent from "../../components/jobs/FilterContent";
import JobStats from "../../components/jobs/JobStats";
import Button from "../../components/Button";

const JobBoard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className='p-6 bg-white'>
      {/* 헤더 - 채용 통계 */}
      <JobStats />

      {/* 필터 버튼 */}
      <JobFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

      {/* 선택된 필터 내용 */}
      <div className='mt-4'>
        <FilterContent selectedFilter={selectedFilter} />
      </div>

      {/* 검색 바 */}
      <div className='flex justify-center mt-4'>
        <Button label='Reset' onClick={() => alert("Clicked!")} />
        <Button label='Search' onClick={() => alert("Clicked!")} />
      </div>
    </div>
  );
};

export default JobBoard;
