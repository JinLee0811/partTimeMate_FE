interface MyPageTabsProps {
  activeTab: "personal" | "password" | "delete" | "settings";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"personal" | "password" | "delete" | "settings">
  >;
  isEmployer: boolean;
}

export default function MyPageTabs({ activeTab, setActiveTab, isEmployer }: MyPageTabsProps) {
  // ✅ 탭 목록 동적 설정
  const tabs = isEmployer
    ? ["personal", "password", "settings", "delete"] // 고용주일 때
    : ["personal", "password", "delete"]; // 구직자일 때

  const tabLabels: Record<string, string> = {
    personal: "Edit Profile",
    password: "Change Password",
    settings: "Business Settings",
    delete: "Delete Account",
  };

  return (
    <div className='flex border-b'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-1 py-2 ${
            activeTab === tab ? "border-b-2 border-black font-bold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab as "personal" | "password" | "delete" | "settings")}>
          {tabLabels[tab]}
        </button>
      ))}
    </div>
  );
}
