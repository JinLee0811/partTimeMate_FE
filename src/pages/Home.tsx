import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";

export default function Home() {
  return (
    <>
      <MainHeader />
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>Find the Best Part-time Jobs</h1>
        <p className='mt-2 text-gray-600'>Browse available job listings</p>
        <Link to='/jobs'>
          <button className='mt-4 bg-blue-500 text-white px-6 py-2 rounded'>Browse Jobs</button>
        </Link>
      </div>
    </>
  );
}
