/** SNS 로그인 버튼 */
const SocialLogin = () => {
  return (
    <div className='space-y-4'>
      <button
        type='button'
        className='px-4 py-2.5 flex items-center justify-center rounded-md text-white text-sm tracking-wider bg-blue-600 hover:bg-blue-700 w-full'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png'
          alt='Facebook'
          className='w-5 h-5 mr-3'
        />
        Continue with Facebook
      </button>

      <button
        type='button'
        className='px-4 py-2.5 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider bg-gray-100 hover:bg-gray-200 w-full'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
          alt='Google'
          className='w-5 h-5 mr-3'
        />
        Continue with Google
      </button>
      <button
        type='button'
        className='px-4 py-2.5 flex items-center justify-center rounded-md text-white text-sm tracking-wider bg-black hover:bg-gray-900 w-full'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
          alt='Apple'
          className='w-5 h-5 mr-3'
        />
        Continue with Apple
      </button>
    </div>
  );
};

export default SocialLogin;
