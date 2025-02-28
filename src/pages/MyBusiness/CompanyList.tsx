import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/pagenation";
import { useCompanyStore } from "../../store/useCompanyStore";

export default function CompanyList() {
  // Zustand store에서 필요한 상태와 액션 가져오기
  const { companies, totalPage, currentPage, loading, error, fetchCompanies, deleteCompany } =
    useCompanyStore();

  // 로컬 검색어 상태
  const [searchQuery, setSearchQuery] = useState("");

  // 컴포넌트 마운트 또는 currentPage 변경 시 회사 목록 불러오기
  useEffect(() => {
    fetchCompanies(currentPage);
  }, [currentPage, fetchCompanies]);

  // 검색어에 따른 필터링 (검색어가 없으면 전체 목록 사용)
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayCompanies = searchQuery ? filteredCompanies : companies;

  // 검색 입력값 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // 검색어가 변경되면 로컬 필터링만 적용 (API 호출은 하지 않음)
  };

  // 편집 핸들러 (추후 편집 페이지 이동 또는 모달 오픈 구현)
  const handleEdit = (companyId: string) => {
    console.log("Editing company:", companyId);
  };

  // 삭제 핸들러: 삭제 확인 후 store 액션 호출
  const handleDelete = (companyId: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(companyId);
    }
  };

  // 페이지 변경 핸들러 (Pagination 컴포넌트의 onPageChange 호출 시)
  const handlePageChange = (page: number) => {
    fetchCompanies(page);
  };

  return (
    <div className='min-h-screen pt-5 bg-white'>
      <h2 className='text-2xl font-bold mb-4'>Registered Company List</h2>
      <p className='text-gray-600 mb-6'>Manage users, jobs, and categories efficiently.</p>

      {/* 검색 입력란 */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search companies...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {loading ? (
        <p>Loading companies...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : displayCompanies.length === 0 ? (
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
              <th className='border border-gray-300 px-4 py-2 text-left'>Contact Email</th>
              <th className='border border-gray-300 px-4 py-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayCompanies.map((company) => (
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
                <td className='border border-gray-300 px-4 py-2'>{company.ceoName}</td>
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
                  <p className='text-sm'>{company.contactEmail}</p>
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

      {/* 페이지네이션: 검색 중이 아닐 때만 노출 (API 페이지 기준) */}
      {!searchQuery && !loading && companies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
