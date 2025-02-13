import Table from "../../../components/Table";

const categories = [
  { id: 1, name: "Hospitality" },
  { id: 2, name: "Retail" },
];

export default function CategoryManagement() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Category Management</h2>
      <Table
        columns={["ID", "Category Name", "Actions"]}
        data={categories.map((category) => [
          category.id,
          category.name,
          <button className='text-blue-500'>Edit</button>,
        ])}
      />
    </div>
  );
}
