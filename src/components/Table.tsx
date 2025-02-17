interface TableProps {
  columns: string[];
  data: (string | number | JSX.Element)[][]; // 🔹 `JSX.Element` 타입 추가
}

export default function Table({ columns, data }: TableProps) {
  return (
    <table className='w-full bg-white border border-gray-300 shadow-sm'>
      <thead className='bg-gray-100 border-b'>
        <tr>
          {columns.map((col) => (
            <th key={col} className='p-3 text-left'>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className='border-b hover:bg-gray-50'>
            {row.map((cell, i) => (
              <td key={i} className='p-3'>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
