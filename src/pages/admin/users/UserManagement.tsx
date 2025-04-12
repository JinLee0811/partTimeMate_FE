import { useState, useEffect } from "react";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import UserEditForm from "./UserEditForm";
import UserDetailModal from "./UserDetail";
import Pagination from "../../../components/pagenation";
import { useAdminStore } from "../../../store/useAdminStore";
import { FaSearch, FaUserEdit, FaUserCog, FaTrash, FaEye } from "react-icons/fa";

export default function UserManagement() {
  const { users, updateUser, deleteUser, fetchUsers, totalCount } = useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "view" | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [displayPage, setDisplayPage] = useState(1);
  const itemsPerPage = 10;

  // --- Calculate height for 10 items (adjust base height per row as needed) ---
  // Assuming roughly 60px per row (padding included)
  const listHeight = 60 * itemsPerPage; // 600px for 10 items
  // -----------------------------------------------------------------------

  useEffect(() => {
    setIsLoading(true);
    fetchUsers(1).finally(() => {
      setIsLoading(false);
    });
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) =>
    [user.email, user.firstName, user.lastName]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const startIndex = (displayPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setDisplayPage(page);
  };

  useEffect(() => {
    setDisplayPage(1);
  }, [searchQuery]);

  const openModal = (type: "edit" | "view", user: any) => {
    setSelectedUser(user);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (updatedUser: any) => {
    try {
      setIsLoading(true);
      await updateUser(updatedUser.id.toString(), updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setIsLoading(true);
        await deleteUser(userId.toString());
        await fetchUsers(1);
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className='bg-white rounded-lg shadow-md overflow-hidden'
          style={{ minHeight: "70vh" }}>
          <div className='px-6 py-5 border-b border-gray-200'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <h2 className='text-2xl font-bold text-gray-800'>User Management</h2>
              <div className='mt-3 md:mt-0 relative'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaSearch className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    placeholder='Search users...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <div className='min-w-full divide-y divide-gray-200'>
              <div className='bg-gray-50'>
                <div className='grid grid-cols-7 gap-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  <div>Register Date</div>
                  <div>Email</div>
                  <div>First Name</div>
                  <div>Last Name</div>
                  <div>Role</div>
                  <div>Language</div>
                  <div className='text-right'>Actions</div>
                </div>
              </div>
              <div className='bg-white h-[600px] overflow-y-auto'>
                {isLoading || displayedUsers.length === 0 ? (
                  <div className='flex items-center justify-center h-full text-gray-500'>
                    {isLoading ? "Loading..." : "No users found"}
                  </div>
                ) : (
                  displayedUsers.map((user) => (
                    <div
                      key={user.id}
                      className='grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0'>
                      <div className='text-sm text-gray-900'>
                        {new Date(user.createdAt || "").toLocaleDateString("en-AU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                      <div className='text-sm text-gray-900 truncate'>{user.email}</div>
                      <div className='text-sm text-gray-900'>{user.firstName}</div>
                      <div className='text-sm text-gray-900'>{user.lastName}</div>
                      <div className='text-sm text-gray-900'>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === "ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "BUSINESS"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}>
                          {user.role}
                        </span>
                      </div>
                      <div className='text-sm text-gray-900'>{user.preferredLanguage}</div>
                      <div className='text-sm text-right space-x-2'>
                        <button
                          onClick={() => openModal("view", user)}
                          className='text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50'>
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openModal("edit", user)}
                          className='text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50'>
                          <FaUserEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className='text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50'>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className='px-6 py-4 border-gray-200 bg-white'>
            <Pagination
              currentPage={displayPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {modalType === "edit" ? (
            <UserEditForm
              user={selectedUser}
              onUpdate={handleUpdateUser}
              onCancel={() => setIsModalOpen(false)}
            />
          ) : (
            <UserDetailModal user={selectedUser} onClose={() => setIsModalOpen(false)} />
          )}
        </Modal>
      )}
    </div>
  );
}
