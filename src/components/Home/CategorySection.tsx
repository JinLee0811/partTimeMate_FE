import { Link } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import LoginSection from "../MainHeader/LoginSection";

export default function CategorySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const regions = [
    "Sydney CBD",
    "North Sydney",
    "Inner West",
    "Eastern Suburbs",
    "Western Sydney",
    "Northern Beaches",
    "Parramatta",
    "Hills District",
    "South Sydney",
    "Sutherland",
    "Ryde",
    "Chatswood",
    "Liverpool",
    "Blacktown",
    "Penrith",
  ];

  const jobTypes = [
    { icon: "🚇", label: "Train Station", path: "/jobs/station" },
    { icon: "🏪", label: "Retail", path: "/jobs/retail" },
    { icon: "⏰", label: "Short-term", path: "/jobs/short-term" },
    { icon: "🎓", label: "University", path: "/jobs/university" },
    { icon: "🏢", label: "Office", path: "/jobs/office" },
    { icon: "B", label: "Branded Jobs", path: "/jobs/branded" },
    { icon: "🍽️", label: "Restaurant", path: "/jobs/restaurant" },
    { icon: "🏫", label: "Education", path: "/jobs/education" },
    { icon: "👥", label: "Part-time", path: "/jobs/part-time" },
  ];

  const targetGroups = [
    { icon: "👨‍🎓", label: "Students", path: "/jobs/students" },
    { icon: "🌍", label: "Working Holiday", path: "/jobs/working-holiday" },
    { icon: "🎓", label: "Graduates", path: "/jobs/graduates" },
    { icon: "💼", label: "Professionals", path: "/jobs/professionals" },
    { icon: "🏠", label: "Local Residents", path: "/jobs/locals" },
  ];

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <div className='flex gap-6'>
        <div className='flex-1'>
          {/* Featured Brand Banner */}
          <div className='bg-amber-700 rounded-lg p-8 mb-8 flex justify-between items-center'>
            <div className='text-white'>
              <h2 className='text-2xl font-bold mb-2'>Find Jobs & Get Rewards!</h2>
              <p className='text-amber-200'>Get hired and earn bonus rewards</p>
            </div>
            <img src='/mascot.png' alt='Mascot' className='h-24' />
          </div>

          {/* Category Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Region Based Jobs */}
            <div className='bg-white rounded-lg border p-6'>
              <h3 className='text-lg font-bold mb-4'>Jobs by Region</h3>
              <div className='grid grid-cols-3 gap-2 text-sm'>
                {regions.map((region) => (
                  <Link
                    key={region}
                    to={`/jobs/region/${region.toLowerCase().replace(/\s+/g, "-")}`}
                    className='hover:text-blue-500 py-1'>
                    {region}
                  </Link>
                ))}
              </div>
            </div>

            {/* Job Types */}
            <div className='bg-white rounded-lg border p-6'>
              <h3 className='text-lg font-bold mb-4'>Jobs by Type</h3>
              <div className='grid grid-cols-3 gap-4'>
                {jobTypes.map((type) => (
                  <Link
                    key={type.label}
                    to={type.path}
                    className='flex items-center gap-2 hover:text-blue-500'>
                    <span className='text-xl'>{type.icon}</span>
                    <span>{type.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Target Groups */}
            <div className='bg-white rounded-lg border p-6'>
              <h3 className='text-lg font-bold mb-4'>Jobs by Target Group</h3>
              <div className='grid grid-cols-2 gap-4'>
                {targetGroups.map((group) => (
                  <Link
                    key={group.label}
                    to={group.path}
                    className='flex items-center gap-2 hover:text-blue-500'>
                    <span className='text-xl'>{group.icon}</span>
                    <span>{group.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Brand Logos */}
            <div className='bg-white rounded-lg border p-6'>
              <h3 className='text-lg font-bold mb-4'>Featured Brands</h3>
              <div className='grid grid-cols-4 gap-4'>
                {["Woolworths", "Coles", "KFC", "Subway"].map((brand) => (
                  <Link
                    key={brand}
                    to={`/brands/${brand.toLowerCase()}`}
                    className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200'>
                    <img
                      src={`/brands/${brand.toLowerCase()}.png`}
                      alt={brand}
                      className='w-16 h-16 object-contain'
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Login Box */}
        <div className='w-80'>
          <LoginSection />
        </div>
      </div>
    </div>
  );
}
