import React from "react";

import JobStats from "../../components/jobs/JobStats";
import JobFilter from "../../components/jobs/filters/JobFilter";
import FilterJobList from "../../components/jobs/FilterJobList";

const JobBoard: React.FC = () => {
  return (
    <div className=' bg-white'>
      {/* 헤더 - 채용 통계 */}
      <JobStats />
      <JobFilter />
      <FilterJobList />
    </div>
  );
};

export default JobBoard;
