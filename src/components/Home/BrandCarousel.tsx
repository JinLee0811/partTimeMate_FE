import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const brands = [
  { name: "Woolworths", logo: "/brands/woolworths.png" },
  { name: "Coles", logo: "/brands/coles.png" },
  { name: "KFC", logo: "/brands/kfc.png" },
  { name: "Subway", logo: "/brands/subway.png" },
  { name: "Hungry Jacks", logo: "/brands/hungryjacks.png" },
  { name: "IGA", logo: "/brands/iga.png" },
  { name: "Aldi", logo: "/brands/aldi.png" },
  { name: "Dan Murphys", logo: "/brands/danmurphys.png" },
];

export default function BrandCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= brands.length ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? brands.length - itemsPerPage : prevIndex - 1
    );
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  const visibleBrands = brands.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <div className='relative'>
        <h2 className='text-xl font-bold mb-4'>Featured Brands</h2>
        <div className='relative overflow-hidden'>
          <div className='flex items-center'>
            <button
              onClick={prevSlide}
              className='absolute left-0 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white'>
              <FaChevronLeft className='text-gray-600' />
            </button>
            <div className='flex gap-4 transition-transform duration-300 ease-in-out'>
              {visibleBrands.map((brand, index) => (
                <Link
                  key={brand.name}
                  to={`/brands/${brand.name.toLowerCase()}`}
                  className='flex-shrink-0 w-32 h-32 bg-white border rounded-lg p-4 hover:shadow-md transition-shadow'>
                  <div className='w-full h-full flex items-center justify-center'>
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className='max-w-full max-h-full object-contain'
                    />
                  </div>
                </Link>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className='absolute right-0 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white'>
              <FaChevronRight className='text-gray-600' />
            </button>
          </div>
        </div>
        <div className='flex justify-center mt-4 gap-1'>
          {Array.from({ length: Math.ceil(brands.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                Math.floor(currentIndex / itemsPerPage) === index ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
