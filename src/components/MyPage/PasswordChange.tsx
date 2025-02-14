import { useState } from "react";
import { useUpdatePassword } from "../../hooks/useUpdatePassword"; // ✅ 비밀번호 변경 훅

export default function PasswordChange() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: changePassword, isPending } = useUpdatePassword();

  // ✅ 비밀번호 변경 핸들러
  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // ✅ 비밀번호 변경 API 호출
    changePassword(newPassword, {
      onSuccess: () => {
        alert("✅ Password successfully updated!");
        setNewPassword("");
        setConfirmPassword("");
      },
      onError: (error) => {
        alert(error.message || "❌ Failed to update password. Please try again.");
      },
    });
  };

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold mb-4'>Change Password</h3>

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

      {/* 🔹 변경 버튼 */}
      <button
        onClick={handleChangePassword}
        className={`w-full p-3 font-semibold rounded-md transition ${
          isPending || !newPassword || !confirmPassword
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={isPending || !newPassword || !confirmPassword}>
        {isPending ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
}
