import { useState } from "react";

export default function PasswordChange() {
  // ✅ 상태 관리
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ 비밀번호 변경 핸들러
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    alert("Password successfully updated!");
    setError(""); // 오류 메시지 초기화
  };

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold mb-4'>Change Password</h3>

      {/* 🔹 현재 비밀번호 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Current Password</label>
        <input
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='Enter current password'
        />
      </div>

      {/* 🔹 새 비밀번호 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>New Password</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='Enter new password'
        />
      </div>

      {/* 🔹 새 비밀번호 확인 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Confirm New Password</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
          placeholder='Confirm new password'
        />
      </div>

      {/* 🔹 에러 메시지 */}
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

      {/* 🔹 변경 버튼 */}
      <button
        onClick={handleChangePassword}
        className={`w-full p-3 font-semibold rounded-md transition ${
          !currentPassword || !newPassword || !confirmPassword
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={!currentPassword || !newPassword || !confirmPassword}>
        Change Password
      </button>
    </div>
  );
}
