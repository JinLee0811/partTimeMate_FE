// types/jobPosting.ts
export interface WorkPeriod {
  startDate: Date | null;
  endDate: Date | null;
}

export interface WorkHours {
  start: Date | null;
  end: Date | null;
}

export interface JobPostingData {
  title: string;
  companyName: string;
  companyLogo: File | string | null;
  jobCategory: string;
  salary: string;
  salaryType: string;
  salaryNegotiable: boolean;
  workPeriod: WorkPeriod;
  workHours: WorkHours;
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
}
