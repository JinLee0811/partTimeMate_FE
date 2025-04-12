import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface UserEditFormProps {
  user: any;
  onUpdate: (updatedUser: any) => void;
  onCancel: () => void;
}

export default function UserEditForm({ user, onUpdate, onCancel }: UserEditFormProps) {
  const [formData, setFormData] = useState({ ...user });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdate(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-xl font-bold mb-6 text-gray-800 border-b pb-2'>Edit User</h2>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Role</label>
            <select
              name='role'
              value={formData.role}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
              <option value='Job Seeker'>Job Seeker</option>
              <option value='Employer'>Employer</option>
              <option value='Admin'>Admin</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Preferred Language
            </label>
            <select
              name='preferredLanguage'
              value={formData.preferredLanguage}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
              <option value='English'>English</option>
              <option value='Korean'>Korean</option>
              <option value='Japanese'>Japanese</option>
              <option value='Chinese'>Chinese</option>
            </select>
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-4 border-t'>
          <button
            type='button'
            className='flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors'
            onClick={onCancel}
            disabled={isSubmitting}>
            <FaTimes className='mr-2' />
            Cancel
          </button>
          <button
            type='submit'
            className='flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
            disabled={isSubmitting}>
            <FaSave className='mr-2' />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
