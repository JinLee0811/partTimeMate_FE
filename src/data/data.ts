import { faker } from "@faker-js/faker";

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  address: string;
  jobType: string;
  salary: string;
  duration: string;
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

// 🇦🇺 **Sydney Version (English) - Random Data Generator**
export const generateFakeJobs = (count = 50): JobPosting[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    title: faker.person.jobTitle(),
    company: faker.company.name(),
    location: `${faker.location.city()}, ${faker.location.state()}`,
    address: faker.location.streetAddress(),
    jobType: faker.helpers.arrayElement(["Part-time", "Casual", "Full-time", "Contract"]),
    salary: `AUD ${faker.number.float({ min: 22.5, max: 35 }).toFixed(2)}/hr`,
    duration: faker.helpers.arrayElement(["3 months", "6 months", "1 year", "Flexible"]),
    workDays: faker.helpers.arrayElements(
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Weekends"],
      2
    ),
    workHours: faker.helpers.arrayElement([
      "8:00 AM - 12:00 PM",
      "12:00 PM - 6:00 PM",
      "6:00 PM - 10:00 PM",
      "Night Shift",
    ]),
    description: faker.lorem.sentence(),
    requirements: [faker.lorem.sentence(5), faker.lorem.sentence(5), faker.lorem.sentence(5)],
    preferred: [faker.lorem.sentence(5), faker.lorem.sentence(5)],
    contact: {
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
    },
    postedDate: faker.date.recent().toISOString(),
  }));
};

// 자동 생성된 더미 데이터 저장
export const jobs_en: JobPosting[] = generateFakeJobs();
