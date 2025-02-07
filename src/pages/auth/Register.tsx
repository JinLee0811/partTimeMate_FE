import { useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-10'>
      {/* 타이틀 */}
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Welcome to Part-Time Mate</h1>

      <div className='w-full max-w-lg space-y-6'>
        {/* 개인 회원 */}
        <UserCard
          title='Job Seeker'
          description='Looking for part-time jobs'
          buttonText='Sign Up as Job Seeker'
          bgColor='bg-yellow-400 hover:bg-yellow-500'
          icon='👤'
          navigateTo='/auth/signup/user'
        />
        {/* 기업 회원 */}
        <UserCard
          title='Employer'
          description='Hiring part-time workers (Business Owners, HR)'
          buttonText='Sign Up as Employer'
          bgColor='bg-blue-500 hover:bg-blue-600'
          icon='📄'
          navigateTo='/auth/signup/business'
        />

        {/* 추가 정보 */}
        <p className='text-center text-sm text-gray-500'>
          Need quick job posting assistance? Call{" "}
          <a href='tel:1661-2544' className='text-blue-600 font-medium hover:underline'>
            1661-2544
          </a>
        </p>
      </div>
    </div>
  );
};

/** 회원가입 카드 컴포넌트 */
const UserCard = ({
  title,
  description,
  buttonText,
  bgColor,
  icon,
  navigateTo,
}: {
  title: string;
  description: string;
  buttonText: string;
  bgColor: string;
  icon: string;
  navigateTo: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className='bg-white rounded-lg shadow-md p-6 text-center'>
      <div className='text-5xl mb-2'>{icon}</div>
      <h2 className='text-lg font-semibold text-gray-700'>{title}</h2>
      <p className='text-sm text-gray-500 mb-4'>{description}</p>
      <button
        onClick={() => navigate(navigateTo)}
        className={`w-full py-3 text-white font-medium rounded-md transition ${bgColor}`}>
        {buttonText}
      </button>
    </div>
  );
};

export default Register;
