interface DropdownMenuProps {
  menuKey: string;
}

const menuData: Record<string, { title: string; items: string[] }> = {
  jobs: {
    title: "Job Categories",
    items: ["Full-time", "Part-time", "Casual"],
  },
  brands: {
    title: "Popular Brands",
    items: ["McDonald's", "Starbucks", "Coles"],
  },
  candidates: {
    title: "Candidate Services",
    items: ["Resume Assistance", "Job Match", "Career Advice"],
  },
  mypages: {
    title: "My Page",
    items: ["Resume Assistance", "Job Match", "Career Advice"],
  },
  admin: {
    title: "Admin Panel",
    items: ["Dashboard", "User Management", "Job Management", "Category Management"],
  },
};

export default function DropdownMenu({ menuKey }: DropdownMenuProps) {
  const menu = menuData[menuKey];

  return (
    <div className='absolute left-0 top-auto w-96 bg-white shadow-lg border border-gray-200 p-6 rounded-md z-50'>
      <h3 className='font-bold text-gray-800'>{menu.title}</h3>
      <ul className='text-sm text-gray-600 space-y-1 mt-2'>
        {menu.items.map((item, index) => (
          <li key={index} className='hover:text-blue-500 cursor-pointer'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
