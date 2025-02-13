/** ✅ 유저 역할 타입 */
export type UserRole = "JOB_SEEKER" | "BUSINESS" | "ADMIN";

/** ✅ 유저 기본 타입 */
export interface User {
  id?: string;
  email: string;
  password?: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  preferredLanguage: "ENG" | "KOR" | "JPN";
  createdAt?: string;
  phoneNumber?: string;
}
