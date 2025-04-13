import React, { useState } from "react";
import MyPageTabs from "./MyPageTabs";
import PersonalInfo from "./PersonalInfo";
import PasswordChange from "./PasswordChange";
import AccountDeletion from "./AccountDeletion";

export default function UserInfoEdit() {
  const [activeTab, setActiveTab] = useState<"personal" | "password" | "delete">("personal");

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
    <div className='bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200'>
      {/* Tabs Navigation */}
      <div className='bg-gray-50 p-2'>
        <MyPageTabs activeTab={activeTab} setActiveTab={setActiveTab} isEmployer={false} />
      </div>

      {/* Tab Content */}
      <div className='p-8'>
        <div className='max-w-2xl mx-auto'>{renderTabContent()}</div>
      </div>
    </div>
  );
}
