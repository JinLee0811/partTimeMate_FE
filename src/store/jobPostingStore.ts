// store/jobPostingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JobPostingData } from "../types/jobPosting";

/** 상태 인터페이스 */
interface JobPostingStoreState {
  formData: JobPostingData;
  /** 객체 형태의 Partial<JobPostingData>만 허용 */
  setFormData: (data: Partial<JobPostingData>) => void;
  resetFormData: () => void;
}

/** 기본 초기값 */
const initialFormData: JobPostingData = {
  title: "",
  companyName: "",
  workPeriod: "",
  companyLogo: null,
  jobCategory: "",
  salary: "",
  salaryType: "hourly", // 원하는 기본값으로 설정
  salaryNegotiable: false,
  workHours: null,
  workTime: {
    start: null,
    end: null,
  },
  workDays: [],
  employmentType: "Part-time",
  benefits: [],
  customBenefit: "",
  workAddress: "",
  addressDetail: "",
  locationCoords: "",
  location: "",
  description: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  applicationMethod: "",
  hiringCount: "",
  exposureRegions: [],
  nearbySubways: [],
  nearbySchools: [],
};

/**
 * Zustand 스토어 정의
 * create(...)(...) 이중 커링 문법은 Zustand v4 이상에서 TS 사용 시 권장되는 방식
 */
export const useJobPostingStore = create<JobPostingStoreState>()(
  persist(
    (set) => ({
      formData: initialFormData,

      /**
       * setFormData: Partial<JobPostingData> 객체만 받음
       * => 함수 인자((prev) => {...})는 허용하지 않음
       */
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      resetFormData: () =>
        set(() => ({
          formData: initialFormData,
        })),
    }),
    {
      name: "jobPostingStore", // localStorage key
      // storage: createJSONStorage(() => localStorage), // 기본값이 localStorage
    }
  )
);
