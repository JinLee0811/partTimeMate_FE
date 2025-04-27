// types/jobPosting.ts

export interface Subcategory {
  id: number;
  name: string;
}

export interface JobCategory {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export enum JobLocation {
  SYDNEY_CBD = "Sydney CBD",
  INNER_WEST = "Inner West",
  EASTERN_SUBURBS = "Eastern Suburbs",
  NORTH_SHORE = "North Shore",
  PARRAMATTA = "Parramatta",
  CHATSWOOD = "Chatswood",
  NORTH_SYDNEY = "North Sydney",
  BONDI = "Bondi",
  STRATHFIELD = "Strathfield",
  BURWOOD = "Burwood",
  HURSTVILLE = "Hurstville",
}

export enum ApplicationMethod {
  WALK_IN = "Walk-in",
  EMAIL = "Email",
  PHONE = "Phone",
  SMS = "SMS",
  ONLINE = "Online Application",
}

export type WorkTime = string;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  ceoName: string;
}

export interface JobPostingData {
  // 기본 정보
  title: string;
  subcategoryId: number;

  // 위치 정보
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;

  // 급여 정보
  hourlyRate: string;
  isHourlyRateNegotiable: boolean;

  // 근무 조건
  workPeriods: string[];
  workDays: string[];
  workHours: string[];

  // 직무 설명
  description: string;

  // 지원 방법
  applicationMethods: ApplicationMethod[];
  contactInfo: string;
  deadline?: string;

  // 회사 정보
  companyId?: string;
  company?: Company;

  // 추가 정보
  employmentTypes?: string[];
  preferredLanguages?: string[];
  additionalOptions?: string[];

  // 지원자 직접 입력용
  contact?: string;
  phone?: string;
  email?: string;
  applicationMethod?: string;
}
