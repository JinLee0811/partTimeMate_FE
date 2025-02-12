interface UserProfileHeaderProps {
  username: string | null;
  role: string;
}

export default function UserProfileHeader({ username, role }: UserProfileHeaderProps) {
  return (
    <>
      <div className='relative w-16 h-16 mx-auto mt-5 mb-4'>
        <img
          src='/profile-pic.png'
          alt='User Profile'
          className='w-16 h-16 rounded-full object-cover border border-gray-300'
        />
      </div>
      <h3 className='font-bold text-lg text-gray-900'>{username || "Guest"}</h3>
      <p className='text-sm text-gray-500'>{role}</p>
      <p className='text-sm text-gray-500 hover:underline cursor-pointer'>Edit Profile</p>
    </>
  );
}
