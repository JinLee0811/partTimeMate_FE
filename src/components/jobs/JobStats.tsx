import React from "react";

const JobStats: React.FC = () => {
  const stats = [
    { label: "Total Jobs", count: "104,677", icon: "📊" },
    { label: "Today's Jobs", count: "31,027", icon: "🌟" },
    { label: "Online Applications", count: "42,069", icon: "🖥️" },
    { label: "Youth Friendly", count: "217", icon: "🎒" },
  ];

  return (
    <div className='grid grid-cols-4 gap-4 bg-yellow-300 p-4 rounded-lg'>
      {stats.map((stat, index) => (
        <div key={index} className='bg-white p-4 rounded-lg text-center shadow-md'>
          <p className='text-2xl font-bold'>{stat.count}</p>
          <p className='text-gray-600'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default JobStats;
