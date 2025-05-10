import {
  TalentProfile,
  Skill,
  WorkExperience,
  Education,
  AvailabilityType,
  ExperienceLevel,
} from "../types/talent";

export const mockSkills: Skill[] = [
  { id: "1", name: "JavaScript", category: "Programming" },
  { id: "2", name: "React", category: "Programming" },
  { id: "3", name: "Node.js", category: "Programming" },
  { id: "4", name: "Customer Service", category: "Soft Skills" },
  { id: "5", name: "Sales", category: "Business" },
  { id: "6", name: "Barista", category: "Hospitality" },
  { id: "7", name: "Food Service", category: "Hospitality" },
  { id: "8", name: "Retail", category: "Business" },
  { id: "9", name: "Communication", category: "Soft Skills" },
  { id: "10", name: "Time Management", category: "Soft Skills" },
];

export const mockWorkExperience: WorkExperience[] = [
  {
    title: "Barista",
    company: "Coffee House",
    location: "Sydney, NSW",
    startDate: "2023-01",
    endDate: "2023-12",
    description:
      "Prepared and served various coffee beverages, maintained cleanliness of work area, and provided excellent customer service.",
  },
  {
    title: "Sales Associate",
    company: "Fashion Retail Store",
    location: "Melbourne, VIC",
    startDate: "2022-06",
    endDate: "2022-12",
    description:
      "Assisted customers with product selection, processed sales transactions, and maintained store organization.",
  },
];

export const mockEducation: Education[] = [
  {
    degree: "Bachelor of Business Administration",
    school: "University of Sydney",
    location: "Sydney, NSW",
    startDate: "2021-03",
    endDate: "2024-11",
    description: "Major in Marketing and Minor in International Business",
  },
  {
    degree: "Certificate III in Hospitality",
    school: "TAFE NSW",
    location: "Sydney, NSW",
    startDate: "2022-07",
    endDate: "2023-06",
    description: "Specialized training in food and beverage service",
  },
];

export const mockTalentProfiles: TalentProfile[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    title: "Part-time Barista & Student",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    summary:
      "Current university student with experience in hospitality and retail. Looking for part-time opportunities to balance with studies. Passionate about customer service and creating great experiences.",
    location: "Sydney, NSW",
    availability: [AvailabilityType.PART_TIME, AvailabilityType.FREELANCE],
    experienceLevel: ExperienceLevel.ENTRY,
    hourlyRate: 25,
    skills: mockSkills.slice(3, 8),
    workExperience: [mockWorkExperience[0]],
    education: [mockEducation[0]],
    languages: ["English", "Mandarin"],
    email: "john.smith@example.com",
    phone: "+61 400 000 000",
    linkedin: "https://linkedin.com/in/johnsmith",
    preferredLocations: ["Sydney CBD", "Inner West", "North Shore"],
    preferredIndustries: ["Hospitality", "Retail", "Customer Service"],
    featured: true,
  },
  {
    id: "2",
    firstName: "Emma",
    lastName: "Wilson",
    title: "Customer Service Professional",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
    summary:
      "Experienced customer service professional with a background in retail and hospitality. Strong communication skills and ability to work in fast-paced environments.",
    location: "Melbourne, VIC",
    availability: [AvailabilityType.FULL_TIME, AvailabilityType.PART_TIME],
    experienceLevel: ExperienceLevel.JUNIOR,
    hourlyRate: 30,
    skills: mockSkills.slice(3, 10),
    workExperience: mockWorkExperience,
    education: [mockEducation[1]],
    languages: ["English"],
    email: "emma.wilson@example.com",
    phone: "+61 400 000 001",
    linkedin: "https://linkedin.com/in/emmawilson",
    github: "https://github.com/emmawilson",
    preferredLocations: ["Melbourne CBD", "South Melbourne", "St Kilda"],
    preferredIndustries: ["Retail", "Hospitality", "Administration"],
  },
];

export const mockTalentApi = {
  getAllTalents: async (): Promise<TalentProfile[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTalentProfiles);
      }, 1000);
    });
  },

  getTalentById: async (id: string): Promise<TalentProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const talent = mockTalentProfiles.find((t) => t.id === id);
        if (talent) {
          resolve(talent);
        } else {
          reject(new Error("Talent not found"));
        }
      }, 1000);
    });
  },

  createTalent: async (talent: Omit<TalentProfile, "id">): Promise<TalentProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTalent = {
          ...talent,
          id: String(mockTalentProfiles.length + 1),
        };
        mockTalentProfiles.push(newTalent);
        resolve(newTalent);
      }, 1000);
    });
  },

  updateTalent: async (id: string, talent: Partial<TalentProfile>): Promise<TalentProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockTalentProfiles.findIndex((t) => t.id === id);
        if (index !== -1) {
          mockTalentProfiles[index] = { ...mockTalentProfiles[index], ...talent };
          resolve(mockTalentProfiles[index]);
        } else {
          reject(new Error("Talent not found"));
        }
      }, 1000);
    });
  },

  deleteTalent: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockTalentProfiles.findIndex((t) => t.id === id);
        if (index !== -1) {
          mockTalentProfiles.splice(index, 1);
          resolve();
        } else {
          reject(new Error("Talent not found"));
        }
      }, 1000);
    });
  },
};
