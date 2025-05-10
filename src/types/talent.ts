export enum AvailabilityType {
  FULL_TIME = "Full-time",
  PART_TIME = "Part-time",
  FREELANCE = "Freelance",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
}

export enum ExperienceLevel {
  ENTRY = "Entry Level",
  JUNIOR = "Junior",
  MID = "Mid Level",
  SENIOR = "Senior",
  EXPERT = "Expert",
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface TalentProfile {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  profileImage?: string;
  summary: string;
  location: string;
  availability: AvailabilityType[];
  experienceLevel: ExperienceLevel;
  hourlyRate?: number;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  languages: string[];
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  preferredLocations: string[];
  preferredIndustries: string[];
  featured?: boolean;
}
