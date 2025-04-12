import React, { useState } from "react";
import MyPageTabs from "./MyPageTabs";
import PersonalInfo from "./PersonalInfo";
import PasswordChange from "./PasswordChange";
import AccountDeletion from "./AccountDeletion";

export default function UserInfoEdit() {
  const [activeTab, setActiveTab] = useState<"personal" | "password" | "settings" | "delete">(
    "personal"
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo />;
      case "password":
        return <PasswordChange />;
      case "delete":
        return <AccountDeletion />;
      default:
        return null;
    }
  };

  return (
    <div className='max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white rounded-xl shadow-sm'>
        <div className='border-b border-gray-200'>
          <MyPageTabs activeTab={activeTab} setActiveTab={setActiveTab} isEmployer={false} />
        </div>
        <div className='p-6'>{renderTabContent()}</div>
      </div>
    </div>
  );
}
