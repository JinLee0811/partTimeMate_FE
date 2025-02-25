import { useState, useEffect } from "react";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import UserEditForm from "./UserEditForm";
import UserDetailModal from "./UserDetail";
import Pagination from "../pagenation"; // Pagination 컴포넌트 경로에 맞게 수정
import { useAdminStore } from "../../../store/useAdminStore";

export default function UserManagement() {
  const { users, updateUser, deleteUser, fetchUsers, totalPage, currentPage } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "view" | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 컴포넌트 마운트 시 페이지 1의 데이터를 불러옴
  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  // 페이지 변경 시 fetchUsers 호출
  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  // 모달 열기 (수정 / 상세 보기)
  const openModal = (type: "edit" | "view", user: any) => {
    setSelectedUser(user);
    setModalType(type);
    setIsModalOpen(true);
  };

  // 유저 정보 업데이트
  const handleUpdateUser = async (updatedUser: any) => {
    try {
      await updateUser(updatedUser.id.toString(), updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // 유저 삭제
  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId.toString());
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>User Management</h2>
      <Table
        columns={[
          "Register Date",
          "Email",
          "First Name",
          "Last Name",
          "Role",
          "Language",
          "Actions",
        ]}
        data={users.map((user) => [
          // 생성일(createdAt)을 Australian 날짜 형식으로 변환
          new Date(user.createdAt).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          user.email,
          user.firstName,
          user.lastName,
          user.role,
          user.preferredLanguage,
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />

      {/* 모달 (수정 / 상세 보기) */}
      {isModalOpen && selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {modalType === "edit" ? (
            <UserEditForm
              user={selectedUser}
              onUpdate={handleUpdateUser}
              onCancel={() => setIsModalOpen(false)}
            />
          ) : (
            <UserDetailModal user={selectedUser} />
          )}
        </Modal>
      )}
    </div>
  );
}
