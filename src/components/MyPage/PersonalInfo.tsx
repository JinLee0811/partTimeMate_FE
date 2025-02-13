import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore";
import { useUser } from "../../hooks/useUser"; // ✅ 유저 정보 가져오기
import { updateUserApi } from "../../api/userApi"; // ✅ 유저 정보 업데이트 API
import { User } from "../../types/user"; // ✅ User 타입 가져오기

export default function PersonalInfo() {
  const { user, setUser } = useAuthStore(); // ✅ Zustand에서 유저 정보 가져오기 및 상태 업데이트 함수 추가
  const { refetch, isLoading } = useUser(); // ✅ 유저 정보 갱신

  const defaultUser: Partial<User> = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    preferredLanguage: "ENG",
  };

  const safeUser = user ?? defaultUser;

  const [firstName, setFirstName] = useState(safeUser.firstName || "");
  const [lastName, setLastName] = useState(safeUser.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(safeUser.phoneNumber?.replace("+61", "") || "");
  const [preferredLanguage, setPreferredLanguage] = useState(safeUser.preferredLanguage || "ENG");

  // ✅ 유저 정보 업데이트 Mutation (React Query)
  const mutation = useMutation({
    mutationFn: updateUserApi, // ✅ API 호출
    onSuccess: async (updatedUser) => {
      console.log("✅ 유저 정보 업데이트 성공:", updatedUser);
      setUser(updatedUser); // ✅ Zustand 상태 업데이트
      await refetch(); // ✅ 최신 유저 정보 불러오기
      alert("✅ Your information has been updated successfully!");
    },
    onError: (error: any) => {
      console.error("❌ Failed to update user:", error);
      alert(error.message || "❌ Failed to update your information. Please try again.");
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // 숫자만 허용
    setPhoneNumber(input);
  };

  const handleSave = () => {
    if (!user) return;

    mutation.mutate({
      firstName,
      lastName,
      phoneNumber: phoneNumber ? `+61${phoneNumber}` : "",
      preferredLanguage,
    });
  };

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold mb-4'>Edit Personal Information</h3>

      {/* Email (수정 불가) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Email</label>
        <input
          type='text'
          value={safeUser.email || ""}
          disabled
          className='w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed'
        />
      </div>

      {/* First Name */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>First Name</label>
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
      </div>

      {/* Last Name */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Last Name</label>
        <input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
      </div>

      {/* Phone Number */}
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

      {/* Preferred Language */}
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

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isLoading || mutation.status === "pending"}
        className={`w-full p-3 ${
          isLoading || mutation.status === "pending"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold rounded-md transition`}>
        {isLoading || mutation.status === "pending" ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
