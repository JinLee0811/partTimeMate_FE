// store/jobPostingStore.ts
import { create } from "zustand";
import { JobPostingData, JobLocation, ApplicationMethod, WorkTime } from "../types/jobPosting";

/** 상태 인터페이스 */
interface JobPostingStoreState {
  formData: JobPostingData | null;
  updateFormData: (data: Partial<JobPostingData>) => void;
  resetFormData: () => void;
  setFormData: (data: JobPostingData) => void;
}

/** 기본 초기값 */
const initialFormData: JobPostingData = {
  title: "",
  categoryId: 0,
  locationCategory: JobLocation.SYDNEY_CBD,
  location: "",
  hourly_rate: 0,
  isHourlyRateNegotiable: false,
  workDays: [],
  workTime: "To be discussed",
  isDaysNegotiable: false,
  isTimeNegotiable: false,
  description: "",
  applicationMethods: [],
  contactInfo: "",
};

// localStorage에서 저장된 데이터 불러오기
const loadFormData = (): JobPostingData | null => {
  const saved = localStorage.getItem("jobPostingDraft");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load saved job posting data:", e);
      return null;
    }
  }
  return null;
};

// localStorage에 데이터 저장
const saveFormData = (data: JobPostingData | null) => {
  if (data) {
    try {
      localStorage.setItem("jobPostingDraft", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save job posting data:", e);
    }
  } else {
    localStorage.removeItem("jobPostingDraft");
  }
};

/**
 * Zustand 스토어 정의
 * create(...)(...) 이중 커링 문법은 Zustand v4 이상에서 TS 사용 시 권장되는 방식
 */
const useJobPostingStore = create<JobPostingStoreState>((set) => ({
  formData: loadFormData(),
  updateFormData: (data) =>
    set((state) => {
      const newFormData = state.formData
        ? { ...state.formData, ...data }
        : { ...initialFormData, ...data };
      saveFormData(newFormData);
      return { formData: newFormData };
    }),
  resetFormData: () => {
    saveFormData(null);
    set({ formData: null });
  },
  setFormData: (data) => {
    saveFormData(data);
    set({ formData: data });
  },
}));

export default useJobPostingStore;
