// types/jobPosting.ts

export interface JobPostingData {
  title: string;
  companyName: string;
  workPeriod: string;
  companyLogo: File | string | null;
  jobCategory: string;
  salary: string;
  salaryType: string;
  salaryNegotiable: boolean;
  workHours: number | "To be discussed" | null;
  workTime: { start: null; end: null } | "To be discussed";
  workDays: string[];
  employmentType: string;
  benefits: string[];
  customBenefit: string;
  workAddress: string;
  addressDetail: string;
  locationCoords: string;
  location: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  applicationMethod: string;
  hiringCount: string;
  exposureRegions: string[];
  nearbySubways: string[];
  nearbySchools: string[];
}
