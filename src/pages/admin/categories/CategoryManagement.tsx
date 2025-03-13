import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryManagement() {
  const {
    categories,
    subcategories,
    fetchCategories,
    createCategory,
    addSubcategory,
    deleteCategory,
    deleteSubcategory,
    loading,
    error,
  } = useCategoryStore();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ✅ 한 페이지당 표시할 카테고리 개수

  // ✅ 카테고리 데이터 가져오기
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ 대분류 추가
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await createCategory(newCategoryName.trim());
      setNewCategoryName("");
      alert("✅ Category added successfully!"); // ✅ 성공 알림 추가
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };

  // ✅ 소분류 추가
  const handleAddSubcategory = async () => {
    if (!newSubcategoryName.trim() || !selectedCategory) return;
    try {
      await addSubcategory(Number(selectedCategory), newSubcategoryName.trim());
      setNewSubcategoryName("");
    } catch (err) {
      console.error("Failed to add subcategory", err);
    }
  };

  return (
    <div className='p-6 bg-white shadow-md rounded-md max-w-6xl mx-auto'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Job Category Management</h2>

      {/* ✅ 대분류 & 소분류 추가 UI */}
      <div className='grid grid-cols-[2fr_3fr] gap-6 mb-6'>
        {/* 대분류 추가 */}
        <div className='p-4 bg-gray-100 border rounded-md'>
          <h3 className='text-lg font-semibold mb-2'>Add New Category</h3>
          <input
            type='text'
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder='Enter category name'
            className='p-2 border border-gray-300 rounded-md w-full'
          />
          <button
            onClick={handleAddCategory}
            className='mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full'
            disabled={!newCategoryName.trim()}>
            Add
          </button>
        </div>

        {/* 소분류 추가 */}
        <div className='p-4 bg-gray-100 border rounded-md'>
          <h3 className='text-lg font-semibold mb-2'>Add Subcategory</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='p-2 border border-gray-300 rounded-md w-full'>
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type='text'
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            placeholder='Enter subcategory name'
            className='p-2 border border-gray-300 rounded-md w-full mt-2'
          />
          <button
            onClick={handleAddSubcategory}
            className='mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full'
            disabled={!newSubcategoryName.trim() || !selectedCategory}>
            Add
          </button>
        </div>
      </div>

      {/* ✅ 카테고리 목록 */}
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <>
          <Table
            columns={["ID", "Category Name", "Subcategories", "Actions"]}
            data={paginatedCategories.map((category) => [
              category.id,
              <span className='font-semibold text-gray-800'>{category.name}</span>,
              subcategories[category.id]?.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                  {subcategories[category.id].map((sub) => (
                    <span
                      key={sub.id}
                      className='bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md inline-block'>
                      {sub.name}
                      <button
                        className='ml-2 text-red-500 hover:text-red-700'
                        onClick={() => deleteSubcategory(category.id, sub.id)}>
                        x
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className='text-gray-500'>No subcategories</span>
              ),
              <>
                <button
                  className='text-red-500 hover:text-red-700'
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this category?")) {
                      deleteCategory(category.id);
                    }
                  }}>
                  Delete
                </button>
              </>,
            ])}
          />

          {/* ✅ 페이지네이션 컨트롤 */}
          <div className='flex justify-center mt-6 space-x-4'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={currentPage === 1}>
              Previous
            </button>
            <span className='text-gray-700 text-lg'>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
