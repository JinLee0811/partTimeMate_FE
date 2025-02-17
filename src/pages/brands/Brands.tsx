// src/pages/Brands.tsx
import { useState } from "react";
import { brands } from "../../data/brands";
import BrandCard from "../../components/brands/BrandCard";
import Pagination from "../../components/brands/Pagination";
import BrandJobStats from "../../components/brands/BrandJobStats";

export default function Brands() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const paginatedBrands = brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='max-w-6xl mx-auto px-4 py-10'>
      <div>
        <BrandJobStats />
      </div>
      <h2 className='text-2xl font-bold mb-6'>All Brands</h2>
      <div className='grid grid-cols-4 gap-6'>
        {paginatedBrands.map((brand) => (
          <BrandCard key={brand.id} logo={brand.logo} name={brand.name} jobCount={brand.jobCount} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
