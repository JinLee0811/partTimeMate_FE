import { useState } from "react";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import UserEditForm from "./UserEditForm";
import UserDetailModal from "./UserDetail";

const usersData = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", role: "Job Seeker" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", role: "Employer" },
];

export default function UserManagement() {
  const [users, setUsers] = useState(usersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "view" | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // ✅ 모달 열기 (수정 / 상세 보기)
  const openModal = (type: "edit" | "view", user: any) => {
    setSelectedUser(user);
    setModalType(type);
    setIsModalOpen(true);
  };

  // ✅ 유저 정보 업데이트
  const handleUpdateUser = (updatedUser: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsModalOpen(false);
  };

  // ✅ 유저 삭제
  const handleDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>User Management</h2>
      <Table
        columns={["ID", "First Name", "Last Name", "Email", "Role", "Actions"]}
        data={users.map((user) => [
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.role,
          <div key={user.id} className='flex gap-2'>
            <button onClick={() => openModal("view", user)} className='text-blue-500'>
              View
            </button>
            <button onClick={() => openModal("edit", user)} className='text-green-500'>
              Edit
            </button>
            <button onClick={() => handleDelete(user.id)} className='text-red-500'>
              Delete
            </button>
          </div>,
        ])}
      />

      {/* ✅ 모달 (수정 / 상세 보기) */}
      {isModalOpen && selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {modalType === "edit" ? (
            <UserEditForm user={selectedUser} onUpdate={handleUpdateUser} />
          ) : (
            <UserDetailModal user={selectedUser} />
          )}
        </Modal>
      )}
    </div>
  );
}
