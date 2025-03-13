export interface Subcategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
export const jobCategories: Category[] = [
  {
    id: 1,
    name: "Hospitality & Food Services",
    subcategories: [
      { id: 101, name: "Cafe" },
      { id: 102, name: "Restaurant" },
      { id: 103, name: "Fast Food" },
      { id: 104, name: "Bakery" },
      { id: 105, name: "Bar" },
      { id: 106, name: "Catering" },
      { id: 107, name: "Hotel Services" },
      { id: 108, name: "Food Delivery" },
      { id: 109, name: "Kitchen Hand" },
    ],
  },
  {
    id: 2,
    name: "Retail & Sales",
    subcategories: [
      { id: 201, name: "Supermarket" },
      { id: 202, name: "Clothing Store" },
      { id: 203, name: "Electronics Store" },
      { id: 204, name: "Bookstore" },
      { id: 205, name: "Pharmacy" },
      { id: 206, name: "Furniture Store" },
      { id: 207, name: "Convenience Store" },
      { id: 208, name: "Department Store" },
      { id: 209, name: "Specialty Store" },
    ],
  },
  {
    id: 3,
    name: "Customer Service",
    subcategories: [
      { id: 301, name: "Call Center" },
      { id: 302, name: "Receptionist" },
      { id: 303, name: "Front Desk" },
      { id: 304, name: "Help Desk" },
      { id: 305, name: "Cashier" },
      { id: 306, name: "Retail Customer Service" },
    ],
  },
  {
    id: 4,
    name: "Office & Administration",
    subcategories: [
      { id: 401, name: "Office Assistant" },
      { id: 402, name: "Data Entry" },
      { id: 403, name: "Secretary" },
      { id: 404, name: "Administrative Assistant" },
      { id: 405, name: "Virtual Assistant" },
    ],
  },
  {
    id: 5,
    name: "Cleaning & Maintenance",
    subcategories: [
      { id: 501, name: "Commercial Cleaning" },
      { id: 502, name: "Housekeeping" },
      { id: 503, name: "Hotel Cleaning" },
      { id: 504, name: "Janitorial Services" },
      { id: 505, name: "Facility Maintenance" },
      { id: 506, name: "Window Cleaning" },
    ],
  },
  {
    id: 6,
    name: "Education & Tutoring",
    subcategories: [
      { id: 601, name: "Private Tutor" },
      { id: 602, name: "Language Tutor" },
      { id: 603, name: "Music Tutor" },
      { id: 604, name: "Academic Assistant" },
      { id: 605, name: "Childcare Assistant" },
    ],
  },
  {
    id: 7,
    name: "Healthcare & Aged Care",
    subcategories: [
      { id: 701, name: "Disability Support Worker" },
      { id: 702, name: "Aged Care Assistant" },
      { id: 703, name: "Pharmacy Assistant" },
      { id: 704, name: "Medical Receptionist" },
      { id: 705, name: "Dental Assistant" },
    ],
  },
  {
    id: 8,
    name: "Logistics & Delivery",
    subcategories: [
      { id: 801, name: "Warehouse Worker" },
      { id: 802, name: "Delivery Driver" },
      { id: 803, name: "Courier" },
      { id: 804, name: "Inventory Control" },
      { id: 805, name: "Forklift Operator" },
    ],
  },
  {
    id: 9,
    name: "Construction & Trades",
    subcategories: [
      { id: 901, name: "Labourer" },
      { id: 902, name: "Carpenter Assistant" },
      { id: 903, name: "Painter Assistant" },
      { id: 904, name: "Plumber Assistant" },
      { id: 905, name: "Electrician Assistant" },
    ],
  },
  {
    id: 10,
    name: "Events & Promotions",
    subcategories: [
      { id: 1001, name: "Event Staff" },
      { id: 1002, name: "Festival Crew" },
      { id: 1003, name: "Brand Ambassador" },
      { id: 1004, name: "Usher" },
      { id: 1005, name: "Ticketing Staff" },
      { id: 1006, name: "Photographer" },
    ],
  },
  {
    id: 11,
    name: "Fitness & Recreation",
    subcategories: [
      { id: 1101, name: "Personal Trainer" },
      { id: 1102, name: "Gym Receptionist" },
      { id: 1103, name: "Swimming Instructor" },
      { id: 1104, name: "Lifeguard" },
      { id: 1105, name: "Yoga Instructor" },
    ],
  },
  {
    id: 12,
    name: "Freelance & Creative",
    subcategories: [
      { id: 1201, name: "Graphic Designer" },
      { id: 1202, name: "Web Designer" },
      { id: 1203, name: "Content Writer" },
      { id: 1204, name: "Video Editor" },
      { id: 1205, name: "Social Media Manager" },
      { id: 1206, name: "Photographer" },
    ],
  },
  {
    id: 13,
    name: "Agriculture & Farming",
    subcategories: [
      { id: 1301, name: "Fruit Picker" },
      { id: 1302, name: "Farm Hand" },
      { id: 1303, name: "Vineyard Worker" },
      { id: 1304, name: "Dairy Farm Assistant" },
      { id: 1305, name: "Livestock Care" },
    ],
  },
  {
    id: 14,
    name: "Technology & IT Support",
    subcategories: [
      { id: 1401, name: "IT Support" },
      { id: 1402, name: "Junior Developer" },
      { id: 1403, name: "Data Entry (Tech)" },
      { id: 1404, name: "Web Assistant" },
      { id: 1405, name: "UI/UX Testing" },
    ],
  },
];

export default jobCategories;
