import React from "react";
import { FaBuilding, FaBriefcase, FaUsers } from "react-icons/fa";

export default function BusinessHome() {
  const stats = [
    {
      title: "Total Companies",
      value: "2",
      change: "+1",
      changeType: "increase",
      icon: <FaBuilding className='h-6 w-6' />,
    },
    {
      title: "Active Job Posts",
      value: "5",
      change: "+2",
      changeType: "increase",
      icon: <FaBriefcase className='h-6 w-6' />,
    },
    {
      title: "Total Applications",
      value: "15",
      change: "+5",
      changeType: "increase",
      icon: <FaUsers className='h-6 w-6' />,
    },
  ];

  return (
    <div className='flex-1 bg-gray-50'>
      <div className='max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900'>Business Overview</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Track your business performance and manage your companies efficiently.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {stats.map((item) => (
            <div
              key={item.title}
              className='bg-white overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 bg-orange-50 flex items-center justify-center rounded-lg text-orange-600'>
                      {item.icon}
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>{item.title}</dt>
                      <dd>
                        <div className='text-lg font-semibold text-gray-900'>{item.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-5 py-3'>
                <div className='text-sm'>
                  <span
                    className={`font-medium ${
                      item.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}>
                    {item.change}
                  </span>
                  <span className='text-gray-500'> from last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
