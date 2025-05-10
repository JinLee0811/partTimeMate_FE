import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useCompanyStore } from "../../store/useCompanyStore";

export default function CompanyList() {
  const navigate = useNavigate();
  const { companies, fetchCompanies, deleteCompany } = useCompanyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        await fetchCompanies();
      } catch (err) {
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };
    loadCompanies();
  }, [fetchCompanies]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (companyId: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await deleteCompany(companyId);
      } catch (err) {
        setError("Failed to delete company");
      }
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>
      </div>
    );
  }

  if (error) {
    return <div className='bg-red-50 p-4 rounded-xl text-red-600 text-center'>{error}</div>;
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Company Management</h1>
        <button
          onClick={() => navigate("/mybusiness/company")}
          className='flex items-center px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors duration-200'>
          <FaPlus className='mr-2' />
          Add Company
        </button>
      </div>

      <div className='bg-white rounded-2xl shadow-sm p-6'>
        {/* Search Bar */}
        <div className='relative mb-6'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FaSearch className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search companies...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200'
          />
        </div>

        {/* Company List */}
        <div className='space-y-4'>
          {filteredCompanies.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>No companies found</div>
          ) : (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200'>
                <div className='flex items-center space-x-4'>
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className='w-12 h-12 rounded-lg object-cover'
                    />
                  ) : (
                    <div className='w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center'>
                      <span className='text-gray-400 text-xl font-medium'>
                        {company.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className='font-medium text-gray-900'>{company.name}</h3>
                    <p className='text-sm text-gray-500'>{company.contactEmail}</p>
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => navigate(`/mybusiness/company/${company.id}/edit`)}
                    className='p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200'>
                    <FaEdit className='h-5 w-5' />
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className='p-2 text-gray-600 hover:text-red-500 transition-colors duration-200'>
                    <FaTrash className='h-5 w-5' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
