import { useState } from "react";

interface UserEditFormProps {
  user: any;
  onUpdate: (updatedUser: any) => void;
  onCancel: () => void;
}

export default function UserEditForm({ user, onUpdate, onCancel }: UserEditFormProps) {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-xl font-bold mb-4'>Edit User</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>First Name</label>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Last Name</label>
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Role</label>
          <select
            name='role'
            value={formData.role}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'>
            <option value='Job Seeker'>Job Seeker</option>
            <option value='Employer'>Employer</option>
          </select>
        </div>

        <div className='flex justify-end gap-2'>
          <button type='button' className='p-2 bg-gray-300 rounded-md' onClick={onCancel}>
            Cancel
          </button>
          <button type='submit' className='p-2 bg-blue-500 text-white rounded-md'>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
