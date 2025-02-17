import MyPageTabs from "./MyPageTabs";
import PersonalInfo from "./PersonalInfo";
import PasswordChange from "./PasswordChange";
import AccountDeletion from "./AccountDeletion";
import { useState } from "react";

export default function JobSeekerPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "password" | "settings" | "delete">(
    "personal"
  );

  return (
    <div className='max-w-2xl mx-auto p-10 mt-10 bg-white rounded-lg border border-gray-200 shadow-sm'>
      <h2 className='text-2xl font-bold mb-4 text-center'>회원정보 수정</h2>
      <MyPageTabs activeTab={activeTab} setActiveTab={setActiveTab} isEmployer={false} />

      <div className='mt-6'>
        {activeTab === "personal" && <PersonalInfo />}
        {activeTab === "password" && <PasswordChange />}
        {activeTab === "delete" && <AccountDeletion />}
      </div>
    </div>
  );
}
