import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

export default function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    // TODO: 실제 API 호출
    setCategory({
      id: Number(id),
      name: "IT & Software",
    });
  }, [id]);

  if (!category) return <p>Loading category details...</p>;

  return (
    <div className='p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-2'>{category.name}</h2>
      <p className='text-gray-600'>Manage category settings here.</p>
    </div>
  );
}
