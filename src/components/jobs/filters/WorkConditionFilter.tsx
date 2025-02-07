import React, { useState } from "react";

const workDurations = ["1 Day", "1 Week", "1 Month", "3 Months", "6 Months", "1 Year"];
const workDays = ["Weekdays", "Weekends", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const workHours = ["Morning", "Afternoon", "Evening", "Night", "Overnight"];

const WorkConditionFilter: React.FC = () => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
    );
  };

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div>
        <h3 className='font-bold'>Duration</h3>
        {workDurations.map((duration) => (
          <div
            key={duration}
            className={`p-2 cursor-pointer ${
              selectedConditions.includes(duration) ? "bg-blue-200" : ""
            }`}
            onClick={() => toggleCondition(duration)}>
            {duration}
          </div>
        ))}
      </div>
      <div>
        <h3 className='font-bold'>Days</h3>
        {workDays.map((day) => (
          <div
            key={day}
            className={`p-2 cursor-pointer ${
              selectedConditions.includes(day) ? "bg-blue-200" : ""
            }`}
            onClick={() => toggleCondition(day)}>
            {day}
          </div>
        ))}
      </div>
      <div>
        <h3 className='font-bold'>Hours</h3>
        {workHours.map((hour) => (
          <div
            key={hour}
            className={`p-2 cursor-pointer ${
              selectedConditions.includes(hour) ? "bg-blue-200" : ""
            }`}
            onClick={() => toggleCondition(hour)}>
            {hour}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkConditionFilter;
