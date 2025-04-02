interface DropdownMenuProps {
  menuKey: string;
}

const menuData: Record<string, { title: string; items: string[] }> = {
  jobs: {
    title: "Job Categories",
    items: ["Part-time", "Casual", "Internship"],
  },
  brands: {
    title: "Popular Brands",
    items: ["McDonald's", "Starbucks", "Coles"],
  },
  talent: {
    title: "Talent Pool",
    items: ["Browse Talents", "Featured Profiles"],
  },
  mypage: {
    title: "My Page",
    items: ["My Profile", "My Applications", "My Resume"],
  },
  mybusiness: {
    title: "My Business",
    items: ["Posted Jobs", "Applications", "Company Profile"],
  },
  admin: {
    title: "Admin Panel",
    items: ["User Management", "Job Management"],
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
