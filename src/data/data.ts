export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  address: string;
  jobType: string; // e.g., "Part-time", "Casual"
  salary: string;
  duration: string; // e.g., "6 months - 1 year"
  workDays: string[];
  workHours: string;
  description: string;
  requirements: string[];
  preferred: string[];
  contact: {
    email?: string;
    phone?: string;
    website?: string;
  };
  postedDate: string;
}

// 🇦🇺 **Sydney Version (English)**
export const jobs_en: JobPosting[] = [
  {
    id: "1",
    title: "Convenience Store Staff (Evening Shift)",
    company: "7-Eleven Sydney CBD",
    location: "Sydney, NSW",
    address: "123 George St, Sydney NSW 2000",
    jobType: "Part-time",
    salary: "AUD 25.00/hr",
    duration: "6 months - 1 year",
    workDays: ["Wednesday", "Thursday"],
    workHours: "8:30 PM - 11:30 PM",
    description:
      "We are looking for a part-time evening shift staff for our convenience store. Responsibilities include cashier duties, stocking shelves, and customer service.",
    requirements: ["No prior experience required", "Basic English communication skills"],
    preferred: ["Previous experience in retail or convenience stores", "Nearby residents"],
    contact: {
      email: "jobs@7eleven.com.au",
      phone: "0412 345 678",
      website: "https://7eleven.com.au/jobs",
    },
    postedDate: "2025-02-07",
  },
  {
    id: "2",
    title: "Kitchen Hand",
    company: "Sushi Hub",
    location: "Chatswood, NSW",
    address: "45 Victoria Ave, Chatswood NSW 2067",
    jobType: "Casual",
    salary: "AUD 24.50/hr",
    duration: "Ongoing",
    workDays: ["Monday", "Tuesday", "Friday"],
    workHours: "10:00 AM - 3:00 PM",
    description:
      "Looking for a reliable kitchen hand to assist with food prep, cleaning, and dishwashing in a busy sushi shop.",
    requirements: ["Able to work in a fast-paced environment", "Basic food handling knowledge"],
    preferred: ["Previous kitchen experience", "Fluent in English or Japanese"],
    contact: {
      email: "careers@sushihub.com.au",
      phone: "0401 234 567",
      website: "https://sushihub.com.au/jobs",
    },
    postedDate: "2025-03-15",
  },
  {
    id: "3",
    title: "Cafe Barista",
    company: "The Brew Corner",
    location: "Newtown, NSW",
    address: "88 King St, Newtown NSW 2042",
    jobType: "Part-time",
    salary: "AUD 26.00/hr",
    duration: "3 months (with possibility to extend)",
    workDays: ["Saturday", "Sunday"],
    workHours: "7:00 AM - 1:00 PM",
    description:
      "Friendly and experienced barista wanted for a busy weekend shift. Must be confident with coffee machines and customer service.",
    requirements: ["At least 6 months barista experience", "Good communication skills"],
    preferred: ["Latte art skills", "Lives locally"],
    contact: {
      email: "hiring@brewcorner.com.au",
      phone: "0433 765 432",
      website: "https://brewcorner.com.au/careers",
    },
    postedDate: "2025-04-01",
  },
  {
    id: "4",
    title: "Cleaning Staff (Morning Shift)",
    company: "FreshClean Services",
    location: "Parramatta, NSW",
    address: "12 Church St, Parramatta NSW 2150",
    jobType: "Casual",
    salary: "AUD 23.50/hr",
    duration: "2–3 months (project-based)",
    workDays: ["Monday", "Wednesday", "Friday"],
    workHours: "6:00 AM - 9:00 AM",
    description:
      "Morning cleaner needed for office buildings. Tasks include vacuuming, mopping, emptying bins, and cleaning restrooms.",
    requirements: ["Punctual and reliable", "Basic spoken English"],
    preferred: ["Experience with commercial cleaning", "Own transport"],
    contact: {
      email: "jobs@freshclean.com.au",
      phone: "0455 789 321",
      website: "https://freshclean.com.au/jobs",
    },
    postedDate: "2025-04-05",
  },
];

// 🇰🇷 **Sydney Version (Korean)**
export const jobs_kr: JobPosting[] = [
  {
    id: "1",
    title: "편의점 스태프 (야간 근무)",
    company: "7-Eleven 시드니 CBD",
    location: "시드니, NSW",
    address: "123 George St, Sydney NSW 2000",
    jobType: "파트타임",
    salary: "AUD 25.00/시간",
    duration: "6개월 - 1년",
    workDays: ["수요일", "목요일"],
    workHours: "20:30 - 23:30",
    description:
      "시드니 CBD 편의점에서 야간 근무 스태프를 모집합니다. 주요 업무는 캐셔, 상품 정리, 고객 응대입니다.",
    requirements: ["경력 무관", "기본적인 영어 의사소통 가능"],
    preferred: ["소매업 또는 편의점 근무 경험자 우대", "인근 거주자 우대"],
    contact: {
      email: "jobs@7eleven.com.au",
      phone: "0412 345 678",
      website: "https://7eleven.com.au/jobs",
    },
    postedDate: "2025-02-07",
  },
];
