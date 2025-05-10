interface BrandCardProps {
  logo: string;
  name: string;
  jobCount: number;
}

export default function BrandCard({ logo, name, jobCount }: BrandCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition'>
      <img src={logo} alt={name} className='h-20 mx-auto mb-3' />
      <h3 className='text-lg font-semibold'>{name}</h3>
      <p className='text-gray-500'>{jobCount.toLocaleString()} jobs</p>
    </div>
  );
}
