// src/components/BrandJobStats.tsx
import { brands } from "../../data/brands";

export default function BrandJobStats() {
  return (
    <div className='max-w-7xl mx-auto py-10'>
      <h2 className='text-2xl font-bold mb-6'>Recommended Brands</h2>
      <div className='flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300'>
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`flex flex-col items-center ${brand.bgColor} rounded-full w-24 h-24 p-3 relative`}>
            <img
              src={brand.logo}
              alt={brand.name}
              className='absolute inset-0 w-full h-full object-cover opacity-40 rounded-full'
            />
            <span className='relative text-sm font-medium text-gray-800'>{brand.name}</span>
            <span className='relative font-bold text-lg text-black'>
              {brand.jobCount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
