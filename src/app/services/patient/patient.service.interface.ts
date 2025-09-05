import { Observable } from 'rxjs';
import { Patient } from '../../features/auth/types/patient.type';

export interface IPatientService {
  getPatientById(id: string): Observable<Patient>;
  getPatientByTag(tag: string): Observable<Patient>;
  getAllPatients(name?: string, page?: number, size?: number): Observable<{ content: Patient[]; totalElements: number; totalPages: number; }>;
  updatePatient(id: string, patientDetails: Partial<Patient>): Observable<Patient>;
}
