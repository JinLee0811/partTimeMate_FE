import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useCategoryStore } from "../../../store/useCategoryStore";

/** 간단한 Pencil 아이콘 (Heroicons 예시) */
function PencilIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4 ml-1 text-blue-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M11 17l-5 5m0 0l-2-2m2 2l5-5M16.586 2.586a2 2 0 00-2.828 0L3 13.344a2 2 0 000 2.828l4.586 4.586a2 2 0 002.828 0l10.758-10.758a2 2 0 000-2.828L16.586 2.586z'
      />
    </svg>
  );
}

export default function CategoryManagement() {
  const {
    categories,
    subcategories,
    fetchCategories,
    createCategory,
    addSubcategory,
    updateCategory,
    updateSubcategory,
    deleteCategory,
    deleteSubcategory,
    loading,
    error,
  } = useCategoryStore();

  // 새 대분류 생성용 상태
  const [newCategoryName, setNewCategoryName] = useState("");
  // 소분류 추가용 상태
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");

  // 카테고리 수정용 상태
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  // 소분류 수정용 상태
  const [editingSubcategory, setEditingSubcategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const itemsPerPage = 5; // 한 페이지당 표시할 카테고리 개수
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /** =====================
   *  대분류(카테고리) 추가
   *  ===================== */
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await createCategory(newCategoryName.trim());
      setNewCategoryName("");
      alert("✅ Category added successfully!");
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };

  /** =====================
   *  소분류 추가
   *  ===================== */
  const handleAddSubcategory = async () => {
    if (!newSubcategoryName.trim() || !selectedCategory) return;
    try {
      await addSubcategory(Number(selectedCategory), newSubcategoryName.trim());
      setNewSubcategoryName("");
    } catch (err) {
      console.error("Failed to add subcategory", err);
    }
  };

  /** =====================
   *  대분류(카테고리) 수정
   *  ===================== */
  const handleUpdateCategory = async (categoryId: number) => {
    if (!editedCategoryName.trim()) return;
    if (window.confirm("Are you sure you want to update this category?")) {
      try {
        await updateCategory(categoryId, editedCategoryName.trim());
        setEditingCategoryId(null);
        setEditedCategoryName("");
      } catch (err) {
        console.error("Failed to update category", err);
      }
    }
  };

  /** =====================
   *  소분류 수정
   *  ===================== */
  const handleUpdateSubcategory = async (subcategoryId: number) => {
    if (!editingSubcategory?.name.trim()) return;
    if (window.confirm("Are you sure you want to update this subcategory?")) {
      try {
        await updateSubcategory(subcategoryId, editingSubcategory.name.trim());
        setEditingSubcategory(null);
      } catch (err) {
        console.error("Failed to update subcategory", err);
      }
    }
  };

  return (
    <div className='p-6 bg-white shadow-md rounded-md max-w-6xl mx-auto'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Job Category Management</h2>

      {/* 대분류 & 소분류 추가 UI */}
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

      {/* 목록 영역 */}
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <>
          {/* 
            Table 컴포넌트의 columns를 ID 없이 구성
            ["Category", "Subcategories", "Actions"]
          */}
          <Table
            columns={["Category", "Subcategories", "Actions"]}
            data={paginatedCategories.map((category) => {
              // 카테고리 Cell
              const categoryCell =
                editingCategoryId === category.id ? (
                  <div className='flex items-center'>
                    <input
                      type='text'
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      className='p-1 border border-gray-300 rounded-md'
                    />
                    <button
                      onClick={() => handleUpdateCategory(category.id)}
                      className='ml-2 bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600'>
                      Save
                    </button>
                  </div>
                ) : (
                  <span
                    className='font-semibold text-gray-800 flex items-center gap-1 cursor-pointer'
                    onClick={() => {
                      setEditingCategoryId(category.id);
                      setEditedCategoryName(category.name);
                    }}>
                    {category.name}
                    <PencilIcon />
                  </span>
                );

              // 소분류 Cell
              const subcategoryCell = subcategories[category.id]?.length ? (
                <div className='flex flex-wrap gap-2'>
                  {subcategories[category.id].map((sub) => (
                    <span
                      key={sub.id}
                      className='bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-md inline-flex items-center'>
                      {editingSubcategory && editingSubcategory.id === sub.id ? (
                        <>
                          <input
                            type='text'
                            value={editingSubcategory.name}
                            onChange={(e) =>
                              setEditingSubcategory({
                                ...editingSubcategory,
                                name: e.target.value,
                              })
                            }
                            className='w-20 p-1 border border-gray-300 rounded-md mr-2'
                          />
                          <button
                            onClick={() => handleUpdateSubcategory(sub.id)}
                            className='bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600'>
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <span
                            className='flex items-center cursor-pointer'
                            onClick={() => setEditingSubcategory({ id: sub.id, name: sub.name })}>
                            {sub.name}
                            <PencilIcon />
                          </span>
                        </>
                      )}
                      <button
                        className='ml-2 text-red-500 hover:text-red-700'
                        onClick={() => deleteSubcategory(sub.id)}>
                        x
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className='text-gray-500'>No subcategories</span>
              );

              // 액션 Cell
              const actionsCell = (
                <button
                  className='text-red-500 hover:text-red-700'
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this category?")) {
                      deleteCategory(category.id);
                    }
                  }}>
                  Delete
                </button>
              );

              return [categoryCell, subcategoryCell, actionsCell];
            })}
          />

          {/* 페이지네이션 컨트롤 */}
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
