import React, { useState } from "react";
import { useUpdatePassword } from "../../hooks/useUpdatePassword"; // ✅ 비밀번호 변경 훅

export default function PasswordChange() {
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: changePassword, isPending } = useUpdatePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!newPassword || !confirmPassword) {
      alert("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      setIsLoading(false);
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    // ✅ 비밀번호 변경 API 호출
    changePassword(newPassword, {
      onSuccess: () => {
        alert("✅ Password successfully updated!");
        setNewPassword("");
        setConfirmPassword("");
        setIsLoading(false);
      },
      onError: (error) => {
        alert(error.message || "❌ Failed to update password. Please try again.");
        setIsLoading(false);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Current Password */}
      <div>
        <label htmlFor='currentPassword' className='block text-sm font-medium text-gray-700'>
          Current Password
        </label>
        <div className='mt-1'>
          <input
            type='password'
            id='currentPassword'
            name='currentPassword'
            required
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400'
            placeholder='Enter your current password'
          />
        </div>
      </div>

      {/* New Password */}
      <div>
        <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700'>
          New Password
        </label>
        <div className='mt-1'>
          <input
            type='password'
            id='newPassword'
            name='newPassword'
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400'
            placeholder='Enter your new password'
          />
        </div>
      </div>

      {/* Confirm New Password */}
      <div>
        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
          Confirm New Password
        </label>
        <div className='mt-1'>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400'
            placeholder='Confirm your new password'
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className='pt-4'>
        <button
          type='submit'
          disabled={isLoading || !newPassword || !confirmPassword}
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
              Updating Password...
            </span>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
}
