import EmployerSettings from "../../components/MyPage/EmployerSettings";

export default function CompanyManagement() {
  return (
    <div className='min-h-screen pt-5 bg-white'>
      <h2 className='text-2xl font-bold mb-4'>Register Company</h2>
      <p className='text-gray-600 mb-5'>Manage your company information and hiring preferences.</p>
      <div className='p-6 bg-white rounded-lg shadow-md max-w-4xl'>
        <EmployerSettings />
      </div>
    </div>
  );
}
