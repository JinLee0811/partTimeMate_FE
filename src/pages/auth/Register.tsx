import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import logo2 from "../../assets/logo2.png";
import jobseeker from "../../assets/jobseeker.png";
import recruiter from "../../assets/recruiter.png";

const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 pb-10'>
      {/* Title */}
      <h1 className='text-xl md:text-3xl font-bold text-gray-900 text-center mb-4'>
        All the Job is Here <span className='text-gray-900'>Part-Time Mate</span>
      </h1>
      <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900'>
        Find <span className='text-albamon'>Your Part-Time Job</span>
      </h2>

      {/* Registration Options */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-5xl mt-10'>
        {/* Job Seeker */}
        <UserCard
          title='Job Seeker'
          description='Register your resume and apply for part-time jobs.'
          buttonText='Sign Up as Job Seeker'
          bgColor='bg-albamon hover:bg-albamon-dark'
          textColor='text-white'
          imageSrc={jobseeker}
          navigateTo='/auth/signup/user'
        />

        {/* Employer */}
        <UserCard
          title='Recruiter'
          description='Post job listings and find the best talent for your business.'
          buttonText='Sign Up as Employer'
          bgColor='bg-black hover:bg-gray-900'
          textColor='text-white'
          imageSrc={recruiter}
          navigateTo='/auth/signup/business'
        />
      </div>
    </div>
  );
};

/** User Registration Card Component */
const UserCard = ({
  title,
  description,
  buttonText,
  bgColor,
  textColor,
  imageSrc,
  navigateTo,
}: {
  title: string;
  description: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  imageSrc: string;
  navigateTo: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className='bg-white rounded-xl shadow-md p-8 text-center w-full md:w-1/2 flex flex-col items-center'>
      <img src={imageSrc} alt={title} className='w-36 h-36 object-cover mb-4' />
      <h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
      <p className='text-md text-gray-600 mb-4'>{description}</p>
      <button
        onClick={() => navigate(navigateTo)}
        className={`w-full py-3 rounded-lg font-bold transition ${bgColor} ${textColor}`}>
        {buttonText}
      </button>

      {/* Social Login Buttons */}
      <div className='flex justify-center gap-3 mt-4'>
        <SocialLoginButton icon={<FaGoogle />} />
        <SocialLoginButton icon={<FaFacebookF />} />
        <SocialLoginButton icon={<FaApple />} />
      </div>
    </div>
  );
};

/** Social Login Button Component */
const SocialLoginButton = ({ icon }: { icon: JSX.Element }) => (
  <button className='bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition'>
    {icon}
  </button>
);

export default Register;
