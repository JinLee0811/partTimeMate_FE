import EmployerSettings from "../../components/MyPage/EmployerSettings";

export default function CompanyManagement() {
  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Register Company</h1>
          <p className='text-gray-600 mt-2'>
            Manage your company information and hiring preferences.
          </p>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm'>
        <EmployerSettings />
      </div>
    </div>
  );
}
