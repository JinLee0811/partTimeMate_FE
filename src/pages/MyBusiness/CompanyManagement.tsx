import EmployerSettings from "../../components/MyPage/EmployerSettings";

export default function CompanyManagement() {
  return (
    <div>
      <div className='flex items-center bg-white'>
        <div className='w-full max-w-4xl bg-gray-100 rounded-lg p-10'>
          <EmployerSettings />
        </div>
      </div>
    </div>
  );
}
