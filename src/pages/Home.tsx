import MainHeader from "../components/MainHeader/MainHeader";
import JobList from "../components/JobList";
import FilterJobList from "../components/jobs/FilterJobList";

export default function Home() {
  return (
    <>
      <MainHeader />
      <JobList />
      <FilterJobList />
    </>
  );
}
