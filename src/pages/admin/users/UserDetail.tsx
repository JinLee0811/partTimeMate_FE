interface UserDetailModalProps {
  user: any;
}

export default function UserDetailModal({ user }: UserDetailModalProps) {
  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-xl font-bold mb-4'>User Details</h2>
      <div className='space-y-3'>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}
