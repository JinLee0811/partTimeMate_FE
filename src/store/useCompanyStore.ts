// src/store/useCompanyStore.ts
import { create } from "zustand";
import {
  createCompanyApi,
  fetchCompaniesApi,
  updateCompanyByIdApi,
  deleteCompanyByIdApi,
} from "../api/companyApi";
import { Company } from "../types/company";

/** ✅ 회사 등록 폼에서 사용할 필드 타입 (UI에서 입력하는 데이터 구조) */
interface CompanyFormData {
  name: string; // formData.companyName
  ceo: string; // formData.ceo
  website: string;
  email: string;
  phone: string;
  logoUrl?: string;
  description?: string;
}

/** ✅ 회사 목록 응답 타입 */
interface CompaniesResponse {
  companies: Company[];
  totalCount: number;
  totalPage: number;
  page: number;
}

/** ✅ Zustand Store State 타입 */
interface CompanyStoreState {
  /** 폼에서 입력한 임시 데이터 */
  formData: CompanyFormData;
  /** 폼 데이터 업데이트 함수 */
  setFormData: (data: Partial<CompanyFormData>) => void;

  /** 전체 회사 목록 (페이지네이션용) */
  companies: Company[];
  totalCount: number;
  totalPage: number;
  currentPage: number;

  loading: boolean;
  error: string | null;

  /** 회사 목록 불러오기 */
  fetchCompanies: (page?: number) => Promise<void>;
  /** 회사 등록(Create) */
  createCompany: () => Promise<void>;
  /** 회사 정보 수정(Update) */
  updateCompany: (companyId: string, updatedData: Partial<Company>) => Promise<void>;
  /** 회사 삭제(Delete) */
  deleteCompany: (companyId: string) => Promise<void>;
}

export const useCompanyStore = create<CompanyStoreState>((set, get) => ({
  // 초기 폼 데이터
  formData: {
    name: "",
    ceo: "",
    website: "",
    email: "",
    phone: "",
    logoUrl: "",
    description: "",
  },

  // 폼 데이터 세팅 함수
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  // 회사 목록
  companies: [],
  totalCount: 0,
  totalPage: 1,
  currentPage: 1,

  // 로딩/에러 상태
  loading: false,
  error: null,

  /** 회사 목록 가져오기 */
  fetchCompanies: async (page: number = 1) => {
    set({ loading: true, error: null });
    try {
      const response: CompaniesResponse = await fetchCompaniesApi(page);
      set({
        companies: response.companies,
        totalCount: response.totalCount,
        totalPage: response.totalPage,
        currentPage: response.page,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch companies." });
    } finally {
      set({ loading: false });
    }
  },

  /** 회사 등록(Create) */
  createCompany: async () => {
    set({ loading: true, error: null });
    try {
      // 현재 폼 데이터를 가져옵니다.
      const { formData } = get();

      // API에서 필요한 구조(Company)로 변환
      const newCompanyData: Partial<Company> = {
        name: formData.name,
        ceoName: formData.ceo,
        website: formData.website,
        contactEmail: formData.email,
        // phoneNumber: formData.phone,
        logoUrl: formData.logoUrl,
        // description: formData.description,
      };

      // 실제 API 호출 (POST /company)
      const createdCompany = await createCompanyApi(newCompanyData);

      // 성공 시, companies 리스트에 새로 생성된 회사 추가
      set((state) => ({
        companies: [...state.companies, createdCompany],
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to create company." });
      throw err; // 필요하다면 컴포넌트 측에서 추가 처리
    } finally {
      set({ loading: false });
    }
  },

  /** 회사 정보 수정(Update) */
  updateCompany: async (companyId: string, updatedData: Partial<Company>) => {
    set({ loading: true, error: null });
    try {
      const updatedCompany = await updateCompanyByIdApi(companyId, updatedData);
      set((state) => ({
        companies: state.companies.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        ),
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to update company." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  /** 회사 삭제(Delete) */
  deleteCompany: async (companyId: string) => {
    set({ loading: true, error: null });
    try {
      await deleteCompanyByIdApi(companyId);
      set((state) => ({
        companies: state.companies.filter((company) => company.id !== companyId),
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete company." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
