// Work Hours Data
export const workHourTypes = {
  SELECT_FROM_LIST: "Select from list",
  DIRECT_SELECT: "Direct select",
  EXCLUDE: "Exclude",
};

// Time slot options
export const timeSlotOptions = [
  "Morning shift",
  "Afternoon shift",
  "Evening shift",
  "Night shift",
  "Morning-Afternoon",
  "Afternoon-Evening",
  "Evening-Night",
  "Night-Morning",
  "Full time (8h+)",
];

// Time selection ranges for direct select
export const timeRanges = {
  start: Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: `${i.toString().padStart(2, "0")}:00`,
  })),
  end: Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: `${i.toString().padStart(2, "0")}:00`,
  })),
};
