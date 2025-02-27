// types/company.ts

export interface Company {
  id: string;
  name: string;
  ceoName: string;
  website: string;
  contactEmail: string;
  phoneNumber: string;
  logoUrl?: string;
  description?: string;
}
