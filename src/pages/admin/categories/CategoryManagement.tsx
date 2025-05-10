import { useEffect, useState } from "react";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaChevronDown, FaChevronRight } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { Category, Subcategory } from "../../../types/category";

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

  // 확장된 카테고리 상태 관리
  const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  // 카테고리 확장/축소 토글
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

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
      alert("✅ Subcategory added successfully!");
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
        alert("✅ Category updated successfully!");
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
        await fetchCategories();
        setEditingSubcategory(null);
        alert("✅ Subcategory updated successfully!");
      } catch (err) {
        console.error("Failed to update subcategory", err);
      }
    }
  };

  /** =====================
   *  대분류(카테고리) 삭제
   *  ===================== */
  const handleDeleteCategory = async (categoryId: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? All subcategories will also be deleted."
      )
    ) {
      try {
        await deleteCategory(categoryId);
        alert("✅ Category deleted successfully!");
      } catch (err) {
        console.error("Failed to delete category", err);
      }
    }
  };

  /** =====================
   *  소분류 삭제
   *  ===================== */
  const handleDeleteSubcategory = async (subcategoryId: number) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteSubcategory(subcategoryId);
        alert("✅ Subcategory deleted successfully!");
      } catch (err) {
        console.error("Failed to delete subcategory", err);
      }
    }
  };

  // 검색 필터링
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Category Management</h1>
        <p className='mt-2 text-sm text-gray-600'>Manage job categories and subcategories</p>
      </div>

      {/* 대분류 추가 섹션 */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6'>
        <div className='p-6'>
          <h2 className='text-lg font-medium text-gray-900 mb-4'>Add Main Category</h2>
          <div className='flex flex-col md:flex-row gap-4'>
            <input
              type='text'
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder='Enter new category name'
              className='flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            />
            <button
              onClick={handleAddCategory}
              className='px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200'>
              <FaPlus className='inline-block mr-2' />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* 소분류 추가 섹션 */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6'>
        <div className='p-6'>
          <h2 className='text-lg font-medium text-gray-900 mb-4'>Add Subcategory</h2>
          <div className='flex flex-col md:flex-row gap-4'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'>
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
              placeholder='Enter new subcategory name'
              className='flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            />
            <button
              onClick={handleAddSubcategory}
              className='px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200'>
              <FaPlus className='inline-block mr-2' />
              Add Subcategory
            </button>
          </div>
        </div>
      </div>

      {/* 카테고리 목록 섹션 */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-100'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaSearch className='text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search categories...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 pr-4 py-2 w-full md:w-64 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200'
              />
            </div>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-100'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Category Name
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {filteredCategories.map((category) => (
                <>
                  <tr key={category.id} className='hover:bg-gray-50 transition-colors duration-150'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className='mr-2 text-gray-500 hover:text-gray-700'>
                          {expandedCategories[category.id] ? <FaChevronDown /> : <FaChevronRight />}
                        </button>
                        {editingCategoryId === category.id ? (
                          <div className='flex items-center'>
                            <input
                              type='text'
                              value={editedCategoryName}
                              onChange={(e) => setEditedCategoryName(e.target.value)}
                              className='px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
                              placeholder={category.name}
                            />
                            <button
                              onClick={() => handleUpdateCategory(category.id)}
                              className='ml-2 text-green-600 hover:text-green-800'>
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCategoryId(null)}
                              className='ml-2 text-gray-600 hover:text-gray-800'>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className='text-sm font-medium text-gray-900'>{category.name}</div>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <div className='flex justify-end space-x-2'>
                        {editingCategoryId !== category.id && (
                          <button
                            onClick={() => {
                              setEditingCategoryId(category.id);
                              setEditedCategoryName(category.name);
                            }}
                            className='text-orange-600 hover:text-orange-800 p-1.5 rounded-lg hover:bg-orange-50 transition-colors duration-200'>
                            <FaEdit />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className='text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200'>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* 소분류 목록 */}
                  {expandedCategories[category.id] && (
                    <tr>
                      <td colSpan={2} className='px-6 py-2 bg-gray-50'>
                        <div className='pl-8'>
                          <h3 className='text-sm font-medium text-gray-700 mb-2'>Subcategories</h3>
                          {subcategories[category.id] && subcategories[category.id].length > 0 ? (
                            <div className='space-y-2'>
                              {subcategories[category.id].map((subcategory) => (
                                <div
                                  key={subcategory.id}
                                  className='flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-100'>
                                  {editingSubcategory?.id === subcategory.id ? (
                                    <div className='flex items-center w-full'>
                                      <input
                                        type='text'
                                        value={editingSubcategory.name}
                                        onChange={(e) =>
                                          setEditingSubcategory({
                                            ...editingSubcategory,
                                            name: e.target.value,
                                          })
                                        }
                                        className='flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
                                      />
                                      <button
                                        onClick={() => handleUpdateSubcategory(subcategory.id)}
                                        className='ml-2 text-green-600 hover:text-green-800'>
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingSubcategory(null)}
                                        className='ml-2 text-gray-600 hover:text-gray-800'>
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <span className='text-sm text-gray-900'>
                                        {subcategory.name}
                                      </span>
                                      <div className='flex space-x-2'>
                                        <button
                                          onClick={() =>
                                            setEditingSubcategory({
                                              id: subcategory.id,
                                              name: subcategory.name,
                                            })
                                          }
                                          className='text-orange-600 hover:text-orange-800 p-1 rounded-lg hover:bg-orange-50 transition-colors duration-200'>
                                          <FaEdit />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteSubcategory(subcategory.id)}
                                          className='text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200'>
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className='text-sm text-gray-500'>No subcategories found.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
