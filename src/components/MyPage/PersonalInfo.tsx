import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { User } from "../../types/user"; // ✅ User 타입 가져오기

export default function PersonalInfo() {
  const { user, updateUser } = useAuthStore();

  // ✅ 기본값 설정 (유저 정보가 없을 경우 대비)
  const defaultUser: Partial<User> = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    preferredLanguage: "ENG",
  };

  // ✅ user가 없을 경우 기본값 사용
  const safeUser = user ?? defaultUser;

  // ✅ 상태 관리 (수정 가능한 항목)
  const [firstName, setFirstName] = useState(safeUser.firstName || "");
  const [lastName, setLastName] = useState(safeUser.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(safeUser.phoneNumber?.replace("+61", "") || ""); // ✅ 기존 값에서 +61 제거
  const [preferredLanguage, setPreferredLanguage] = useState(safeUser.preferredLanguage || "ENG");
  const [isSaving, setIsSaving] = useState(false);

  // ✅ 전화번호 입력 핸들러 (숫자만 입력)
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // 숫자만 허용
    setPhoneNumber(input);
  };

  // ✅ 저장 버튼 클릭 시 동작 (모든 데이터 포함하여 전송)
  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await updateUser({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber ? `+61${phoneNumber}` : "", // ✅ 빈 값 방지
        preferredLanguage: preferredLanguage,
      });
      alert("✅ Your information has been updated successfully!");
    } catch (error: any) {
      console.error("❌ Failed to update user:", error);
      alert(error.message || "❌ Failed to update your information. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold mb-4'>Edit Personal Information</h3>

      {/* 🔹 Email (수정 불가) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Email</label>
        <input
          type='text'
          value={safeUser.email || ""}
          disabled
          className='w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed'
        />
      </div>

      {/* 🔹 First Name (수정 가능) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>First Name</label>
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
      </div>

      {/* 🔹 Last Name (수정 가능) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Last Name</label>
        <input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
      </div>

      {/* 🔹 Phone Number (수정 가능, +61 자동 포함) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
        <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
          <span className='bg-gray-200 px-3 py-2 text-gray-600'>+61</span>
          <input
            type='text'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder='Enter phone number (e.g. 435233222)'
            className='flex-1 p-2 focus:outline-none'
          />
        </div>
      </div>

      {/* 🔹 Preferred Language (수정 가능) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Preferred Language</label>
        <select
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value as "ENG" | "KOR" | "JPN")}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'>
          <option value='ENG'>English</option>
          <option value='KOR'>Korean</option>
          <option value='JPN'>Japanese</option>
        </select>
      </div>

      {/* 🔹 Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`w-full p-3 ${
          isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold rounded-md transition`}>
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
