// types/jobPosting.ts

export interface WorkTime {
  start: Date | null;
  end: Date | null;
}

export interface JobPostingData {
  title: string;
  companyName: string;
  workPeriod: string;
  companyLogo: File | string | null;
  jobCategory: string;
  salary: string;
  salaryType: string;
  salaryNegotiable: boolean;
  workHours: number | null;
  workTime: { start: null; end: null } | "To be discussed";
  workDays: string[];
  employmentType: string;
  benefits: string[];
  customBenefit: string;
  workAddress: string;
  addressDetail: string;
  locationCoords: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  applicationMethod: string;
  hiringCount: string;
}
