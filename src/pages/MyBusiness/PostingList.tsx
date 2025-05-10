import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function PostingList() {
  // Sample data
  const postings = [
    {
      id: 1,
      title: "Barista Position",
      company: "Starbucks Gangnam",
      status: "active",
      applications: 12,
      postedDate: "2024-03-15",
      salary: "12,000 KRW/hr",
    },
    {
      id: 2,
      title: "Kitchen Assistant",
      company: "Delicious Restaurant",
      status: "active",
      applications: 8,
      postedDate: "2024-03-14",
      salary: "11,000 KRW/hr",
    },
    {
      id: 3,
      title: "Night Shift Staff",
      company: "GS25 Yeoksam",
      status: "closed",
      applications: 15,
      postedDate: "2024-03-10",
      salary: "10,000 KRW/hr",
    },
  ];

  return (
    <div className='max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>My Job Postings</h1>
        <p className='mt-2 text-sm text-gray-600'>
          Manage your job postings and track applicant status.
        </p>
      </div>

      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Position
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Company
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Salary
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Applicants
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Posted Date
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {postings.map((posting) => (
                <tr key={posting.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>{posting.title}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{posting.company}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{posting.salary}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        posting.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {posting.status === "active" ? "Active" : "Closed"}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{posting.applications} people</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{posting.postedDate}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='flex justify-end space-x-3'>
                      <button className='text-orange-600 hover:text-orange-900' title='View'>
                        <FaEye className='w-4 h-4' />
                      </button>
                      <button className='text-blue-600 hover:text-blue-900' title='Edit'>
                        <FaEdit className='w-4 h-4' />
                      </button>
                      <button className='text-red-600 hover:text-red-900' title='Delete'>
                        <FaTrash className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
