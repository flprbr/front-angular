export interface Patient {
  id: string;
  tag: string;
  fullName: string;
  birthDate: string; // ISO string, ex: '2025-09-04'
  gender: string;
  referralSource: string;
  insuranceCompany: string;
  insurancePlan: string;
}
