import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function PersonalInfo() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // API 호출 로직
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Email */}
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Email
        </label>
        <div className='mt-1'>
          <input
            type='email'
            id='email'
            name='email'
            defaultValue={user?.email}
            disabled
            className='block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
          />
        </div>
      </div>

      {/* First Name */}
      <div>
        <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
          First Name
        </label>
        <div className='mt-1'>
          <input
            type='text'
            id='firstName'
            name='firstName'
            defaultValue={user?.firstName}
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400'
            placeholder='Enter your first name'
          />
        </div>
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
          Last Name
        </label>
        <div className='mt-1'>
          <input
            type='text'
            id='lastName'
            name='lastName'
            defaultValue={user?.lastName}
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400'
            placeholder='Enter your last name'
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
          Phone Number
        </label>
        <div className='mt-1 relative rounded-lg shadow-sm'>
          <div className='absolute inset-y-0 left-0 flex items-center'>
            <select
              id='countryCode'
              name='countryCode'
              className='h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-lg'>
              <option>+61</option>
              <option>+82</option>
              <option>+81</option>
            </select>
          </div>
          <input
            type='tel'
            id='phone'
            name='phone'
            defaultValue={user?.phone}
            className='block w-full pl-20 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400'
            placeholder='Enter phone number'
          />
        </div>
      </div>

      {/* Preferred Language */}
      <div>
        <label htmlFor='language' className='block text-sm font-medium text-gray-700'>
          Preferred Language
        </label>
        <div className='mt-1'>
          <select
            id='language'
            name='language'
            defaultValue='English'
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500'>
            <option>English</option>
            <option>Korean</option>
            <option>Japanese</option>
            <option>Chinese</option>
            <option>Vietnamese</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className='pt-4'>
        <button
          type='submit'
          disabled={isLoading}
          className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed'>
          {isLoading ? (
            <span className='flex items-center'>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                fill='none'
                viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
              Saving Changes...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
