import MyPageTabs from "./MyPageTabs";
import PersonalInfo from "./PersonalInfo";
import PasswordChange from "./PasswordChange";
import EmployerSettings from "./EmployerSettings";
import AccountDeletion from "./AccountDeletion";
import { useState } from "react";

export default function EmployerPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "password" | "settings" | "delete">(
    "personal"
  );

  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm'>
      <h2 className='text-2xl font-bold mb-4 text-center'>My Personal Setting</h2>
      <MyPageTabs activeTab={activeTab} setActiveTab={setActiveTab} isEmployer={true} />

      <div className='mt-6'>
        {activeTab === "personal" && <PersonalInfo />}
        {activeTab === "password" && <PasswordChange />}
        {activeTab === "settings" && <EmployerSettings />}
        {activeTab === "delete" && <AccountDeletion />}
      </div>
    </div>
  );
}
