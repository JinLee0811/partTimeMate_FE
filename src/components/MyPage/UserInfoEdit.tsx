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
    <div>
      <MyPageTabs activeTab={activeTab} setActiveTab={setActiveTab} isEmployer={false} />

      <div className='mt-6'>
        {activeTab === "personal" && <PersonalInfo />}
        {activeTab === "password" && <PasswordChange />}
        {activeTab === "delete" && <AccountDeletion />}
      </div>
    </div>
  );
}
