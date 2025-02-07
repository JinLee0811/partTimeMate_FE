import React, { useState } from "react";

const jobTypes = ["Part-time", "Full-time", "Contract", "Internship"];
const educationLevels = ["No Preference", "High School", "University"];
const benefits = ["Health Insurance", "Meal Support", "Commuter Allowance", "Paid Leave"];

const DetailConditionFilter: React.FC = () => {
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  const toggleDetail = (detail: string) => {
    setSelectedDetails((prev) =>
      prev.includes(detail) ? prev.filter((d) => d !== detail) : [...prev, detail]
    );
  };

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div>
        <h3 className='font-bold'>Job Type</h3>
        {jobTypes.map((type) => (
          <div
            key={type}
            className={`p-2 cursor-pointer ${selectedDetails.includes(type) ? "bg-blue-200" : ""}`}
            onClick={() => toggleDetail(type)}>
            {type}
          </div>
        ))}
      </div>
      <div>
        <h3 className='font-bold'>Education</h3>
        {educationLevels.map((edu) => (
          <div
            key={edu}
            className={`p-2 cursor-pointer ${selectedDetails.includes(edu) ? "bg-blue-200" : ""}`}
            onClick={() => toggleDetail(edu)}>
            {edu}
          </div>
        ))}
      </div>
      <div>
        <h3 className='font-bold'>Benefits</h3>
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className={`p-2 cursor-pointer ${
              selectedDetails.includes(benefit) ? "bg-blue-200" : ""
            }`}
            onClick={() => toggleDetail(benefit)}>
            {benefit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailConditionFilter;
