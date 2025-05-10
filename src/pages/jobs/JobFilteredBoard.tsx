import React from "react";

import JobFilter from "../../components/jobs/filters/JobFilter";
import FilterJobList from "../../components/jobs/FilterJobList";

const JobFilteredBoard: React.FC = () => {
  return (
    <div className=' bg-white pt-10'>
      {/* 헤더 - 채용 통계 */}
      <JobFilter />
      <FilterJobList />
    </div>
  );
};

export default JobFilteredBoard;
