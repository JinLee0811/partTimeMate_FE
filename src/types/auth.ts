import { User } from "./user"; // ✅ 유저 타입 불러오기

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "JOB_SEEKER" | "BUSINESS"; // ✅ 역할 선택
  preferredLanguage?: string;
  //   business_name?: string;
  //   business_address?: string;
  phoneNumber?: string;
}

/** ✅ 로그인 요청 타입 */
export interface LoginRequest {
  email: string;
  password: string;
  role: User["role"]; // ✅ `user.ts`의 `User` 타입 활용
}

/** ✅ 로그인 응답 타입 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/** ✅ 인증 관련 Props 타입 (컴포넌트에서 사용) */
export interface AuthProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

/** ✅ Zustand 상태 관리 타입 (AuthStore) */
export interface AuthState extends AuthProps {
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string, role: User["role"]) => Promise<void>;
  fetchUser: () => Promise<void>;
  refreshAccessToken: () => Promise<string>;
  updateUser: (updatedData: Omit<User, "id" | "createdAt" | "email" | "role">) => Promise<void>; // ✅ ID와 생성일 제외
}
