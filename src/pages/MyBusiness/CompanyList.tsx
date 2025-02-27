import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Company {
  id: string;
  name: string;
  ceo: string;
  website: string;
  email: string;
  phone: string;
  logoUrl?: string;
  description?: string;
}

export default function CompanyList() {
  // Mock Data (임시 데이터)
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Tech Solutions Inc.",
      ceo: "John Doe",
      website: "https://techsolutions.com",
      email: "contact@techsolutions.com",
      phone: "+61 400 123 456",
      logoUrl: "https://via.placeholder.com/50",
      description: "Innovative IT solutions provider.",
    },
    {
      id: "2",
      name: "Green Energy Co.",
      ceo: "Jane Smith",
      website: "https://greenenergy.com",
      email: "info@greenenergy.com",
      phone: "+61 405 678 910",
      logoUrl: "https://via.placeholder.com/50",
      description: "Sustainable energy solutions for a better future.",
    },
  ]);

  // Handle Edit Company
  const handleEdit = (companyId: string) => {
    console.log("Editing company:", companyId);
    // Implement navigation to edit page or open a modal (if needed)
  };

  // Handle Delete Company
  const handleDelete = (companyId: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      const updatedCompanies = companies.filter((company) => company.id !== companyId);
      setCompanies(updatedCompanies);
    }
  };

  return (
    <div className='max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>My Registered Companies</h2>

      {companies.length === 0 ? (
        <p className='text-gray-600'>
          No registered companies. You can add a company from the settings page.
        </p>
      ) : (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2 text-left'>Logo</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>Company Name</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>CEO</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>Website</th>
              <th className='border border-gray-300 px-4 py-2 text-left'>Contact</th>
              <th className='border border-gray-300 px-4 py-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className='border border-gray-300'>
                <td className='border border-gray-300 px-4 py-2'>
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt='Company Logo'
                      className='w-12 h-12 rounded-md'
                    />
                  ) : (
                    <span className='text-gray-500'>No Logo</span>
                  )}
                </td>
                <td className='border border-gray-300 px-4 py-2'>{company.name}</td>
                <td className='border border-gray-300 px-4 py-2'>{company.ceo}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  <a
                    href={company.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 underline'>
                    {company.website}
                  </a>
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  <p className='text-sm'>{company.email}</p>
                  <p className='text-sm text-gray-500'>{company.phone}</p>
                </td>
                <td className='border border-gray-300 px-4 py-2 flex justify-center space-x-2'>
                  <button
                    onClick={() => handleEdit(company.id)}
                    className='text-blue-500 hover:text-blue-700 p-2'
                    title='Edit'>
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className='text-red-500 hover:text-red-700 p-2'
                    title='Delete'>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
