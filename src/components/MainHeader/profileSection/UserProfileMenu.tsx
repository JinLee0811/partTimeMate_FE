interface UserProfileMenuProps {
  items: { label: string; icon: JSX.Element; badge?: number }[];
}

export default function UserProfileMenu({ items }: UserProfileMenuProps) {
  return (
    <div className='grid grid-cols-3 gap-4 mt-6 text-sm text-gray-700'>
      {items.map((item, index) => (
        <div key={index} className='flex flex-col items-center'>
          <div className='relative flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full'>
            {item.icon}
            {item.badge && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                {item.badge}
              </span>
            )}
          </div>
          <span className='mt-2'>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
