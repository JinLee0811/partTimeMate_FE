// types/jobPosting.ts

export enum JobCategory {
  CAFE = "Cafe",
  STORE = "Retail Store",
  DELIVERY = "Delivery",
  RESTAURANT = "Restaurant",
  OFFICE = "Office",
  WAREHOUSE = "Warehouse",
}

export enum JobLocation {
  SYDNEY_CBD = "Sydney CBD",
  NORTH_SYDNEY = "North Sydney",
  INNER_WEST = "Inner West",
  EASTERN_SUBURBS = "Eastern Suburbs",
  WESTERN_SYDNEY = "Western Sydney",
  NORTHERN_BEACHES = "Northern Beaches",
}

export interface WorkingHours {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export interface JobPostingData {
  title: string;
  category: JobCategory;
  location: JobLocation;
  hourlyRate: string | number;
  isHourlyRateNegotiable?: boolean;
  workingHours: WorkingHours[];
  description: string;
  contact: string;
  deadline?: string;
}
