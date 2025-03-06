// src/pages/AccountDeletion.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function AccountDeletion() {
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteAccount } = useAuthStore();
  const navigate = useNavigate();

  // 회원 탈퇴 요청 핸들러: 입력값 확인 후 모달 열기
  const handleDeleteRequest = () => {
    if (!password || confirmText !== "DELETE") {
      setError("Please enter your password and type 'DELETE' to confirm.");
      return;
    }
    setIsModalOpen(true);
    setError("");
  };

  // 최종 회원 탈퇴 처리: API 호출 후 상태 초기화 및 페이지 이동 (성공 시에만 모달 닫음)
  const handleConfirmDelete = async () => {
    try {
      await deleteAccount(password);
      alert("Your account has been successfully deleted.");
      setIsModalOpen(false);
      navigate("/auth/login"); // 삭제 후 이동할 페이지 경로
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to delete account. Please try again.";
      setError(errorMessage);
      // 모달은 열려 있도록 유지
    }
  };

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold mb-4 text-red-500'>Account Deletion</h3>
      <p className='text-sm text-gray-600 mb-4'>
        Deleting your account is irreversible. Please enter your password and type <b>DELETE</b> to
        confirm.
      </p>

      {/* 비밀번호 입력 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none'
          placeholder='Enter your password'
        />
      </div>

      {/* 탈퇴 확인 문구 입력 */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Type <b className='text-red-500'>DELETE</b> to confirm
        </label>
        <input
          type='text'
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none'
          placeholder='Type DELETE to confirm'
        />
      </div>

      {/* 에러 메시지 */}
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

      {/* 탈퇴 요청 버튼 */}
      <button
        onClick={handleDeleteRequest}
        disabled={!password || confirmText !== "DELETE"}
        className={`w-full p-3 font-semibold rounded-md transition ${
          !password || confirmText !== "DELETE"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}>
        Request Account Deletion
      </button>

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
                onClick={handleConfirmDelete}
                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
