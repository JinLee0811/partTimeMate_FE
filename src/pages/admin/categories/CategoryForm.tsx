import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryDetail() {
  const { id } = useParams();
  const { categories, fetchCategories, loading, error } = useCategoryStore();

  useEffect(() => {
    // 카테고리 목록이 없으면 첫 페이지 데이터를 불러옵니다.
    if (categories.length === 0) {
      fetchCategories(1);
    }
  }, [fetchCategories, categories.length]);

  const category = categories.find((c) => c.id === Number(id));

  if (loading) return <p>Loading category details...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;
  if (!category) return <p>Category not found.</p>;

  return (
    <div className='p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-2'>{category.name}</h2>
      <p className='text-gray-600'>Manage category settings here.</p>
    </div>
  );
}
