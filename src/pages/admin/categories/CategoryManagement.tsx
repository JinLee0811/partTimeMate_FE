import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryManagement() {
  const { categories, fetchCategories, createCategory, deleteCategory, loading, error } =
    useCategoryStore();

  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    fetchCategories(1);
  }, [fetchCategories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await createCategory({ name: newCategoryName.trim() });
      setNewCategoryName("");
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Category Management</h2>

      {/* 추가 영역 */}
      <div className='mb-6 p-4 bg-gray-50 border rounded-md'>
        <h3 className='text-lg font-semibold mb-2'>Add New Category</h3>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder='Enter category name'
            className='flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleAddCategory}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
            disabled={!newCategoryName.trim() || loading}>
            Add Category
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <Table
          columns={["ID", "Category Name", "Actions"]}
          data={categories.map((category) => [
            category.id,
            category.name,
            <>
              <button className='text-blue-500 mr-2'>Edit</button>
              <button
                className='text-red-500'
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
      )}
    </div>
  );
}
