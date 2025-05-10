import { useMutation } from "@tanstack/react-query";
import { updatePasswordApi } from "../api/userApi";
import { useUser } from "./useUser"; // ✅ 유저 정보 갱신
import { useAuthStore } from "../store/useAuthStore";

export const useUpdatePassword = () => {
  const { refetch } = useUser(); // 유저 정보 갱신
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: async (updatedUser) => {
      console.log("✅ Password updated successfully:", updatedUser);
      setUser(updatedUser); // ✅ Zustand에 업데이트된 유저 정보 저장
      await refetch(); // ✅ 최신 유저 정보 불러오기
    },
    onError: (error) => {
      console.error("❌ Failed to update password:", error);
      alert(error.message || "❌ Failed to update password. Please try again.");
    },
  });
};
