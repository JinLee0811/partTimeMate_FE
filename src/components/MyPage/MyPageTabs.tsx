interface MyPageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isEmployer?: boolean;
}

export default function MyPageTabs({ activeTab, setActiveTab, isEmployer }: MyPageTabsProps) {
  return (
    <div className='flex border-b'>
      <button
        className={`flex-1 py-2 ${activeTab === "personal" ? "border-b-2 border-black font-bold" : "text-gray-500"}`}
        onClick={() => setActiveTab("personal")}>
        개인정보수정
      </button>
      <button
        className={`flex-1 py-2 ${activeTab === "password" ? "border-b-2 border-black font-bold" : "text-gray-500"}`}
        onClick={() => setActiveTab("password")}>
        비밀번호 변경
      </button>
      {isEmployer ? (
        <button
          className={`flex-1 py-2 ${activeTab === "settings" ? "border-b-2 border-black font-bold" : "text-gray-500"}`}
          onClick={() => setActiveTab("settings")}>
          사업자 설정
        </button>
      ) : (
        <button
          className={`flex-1 py-2 ${activeTab === "delete" ? "border-b-2 border-black font-bold" : "text-gray-500"}`}
          onClick={() => setActiveTab("delete")}>
          회원탈퇴신청
        </button>
      )}
    </div>
  );
}
