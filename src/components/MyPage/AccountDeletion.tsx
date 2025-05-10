// src/pages/AccountDeletion.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function AccountDeletion() {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteAccount } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmText !== "DELETE") {
      alert("Please type 'DELETE' to confirm account deletion");
      return;
    }
    setIsLoading(true);
    try {
      await deleteAccount();
      alert("Your account has been successfully deleted.");
      setIsModalOpen(false);
      navigate("/auth/login");
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to delete account. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
        <h3 className='text-lg font-medium text-red-800 mb-2'>
          Warning: This action cannot be undone
        </h3>
        <p className='text-sm text-red-600'>
          Deleting your account will permanently remove all your data, including your profile,
          resumes, and application history.
        </p>
      </div>

      {/* Password Confirmation */}
      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Current Password
        </label>
        <div className='mt-1'>
          <input
            type='password'
            id='password'
            name='password'
            required
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400'
            placeholder='Enter your current password'
          />
        </div>
      </div>

      {/* Delete Confirmation */}
      <div>
        <label htmlFor='confirmDelete' className='block text-sm font-medium text-gray-700'>
          Type "DELETE" to confirm
        </label>
        <div className='mt-1'>
          <input
            type='text'
            id='confirmDelete'
            name='confirmDelete'
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            required
            className='block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400'
            placeholder='Type "DELETE" to confirm'
          />
        </div>
        <p className='mt-2 text-sm text-gray-500'>
          This action cannot be undone. Please be certain.
        </p>
      </div>

      {/* Submit Button */}
      <div className='pt-4'>
        <button
          type='submit'
          disabled={isLoading || confirmText !== "DELETE"}
          className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed'>
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
              Deleting Account...
            </span>
          ) : (
            "Delete Account"
          )}
        </button>
      </div>

      {/* 에러 메시지 */}
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

      {/* 확인 모달 */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-md text-center max-w-sm'>
            <h3 className='text-lg font-semibold text-red-500 mb-3'>Confirm Deletion</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 bg-gray-300 text-black rounded-md'>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
