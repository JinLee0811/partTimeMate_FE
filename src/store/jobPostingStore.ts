// store/jobPostingStore.ts
import { create } from "zustand";
import { JobPostingData } from "../types/jobPosting";

/** 상태 인터페이스 */
interface JobPostingStoreState {
  formData: JobPostingData | null;
  updateFormData: (data: Partial<JobPostingData>) => void;
  resetFormData: () => void;
}

/** 기본 초기값 */
const initialFormData: JobPostingData = {
  title: "",
  category: "CAFE",
  location: "SYDNEY_CBD",
  hourly_rate: "",
  work_time: "",
  description: "",
  contact: "",
  deadline: undefined,
};

/**
 * Zustand 스토어 정의
 * create(...)(...) 이중 커링 문법은 Zustand v4 이상에서 TS 사용 시 권장되는 방식
 */
export const useJobPostingStore = create<JobPostingStoreState>((set) => ({
  formData: initialFormData,
  updateFormData: (data) =>
    set((state) => ({
      formData: state.formData ? { ...state.formData, ...data } : { ...initialFormData, ...data },
    })),
  resetFormData: () => set({ formData: initialFormData }),
}));
