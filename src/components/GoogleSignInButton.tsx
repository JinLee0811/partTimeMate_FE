export default function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
    // TODO: 구글 로그인 API 연결
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className='w-full p-3 border rounded-lg text-gray-700 hover:bg-gray-100 transition'>
      Sign up with Google
    </button>
  );
}
