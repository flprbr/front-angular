import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IPatientService } from './patient.service.interface';
import { environment } from '../../../environments/environment';
import { Patient } from '../../features/auth/types/patient.type';

interface OldApiResponse {
  status: string;
  pacientes?: Array<{
    Nome: string;
    Nascimento: string;
    Tag: string;
    Convenio: string;
  }>;
  mensagem?: string;
}
interface PacientesApiResponse {
  status: string;
  pacientes?: Array<{
    Nome: string;
    Nascimento: string;
    Tag: string;
    Convenio: string;
  }>;
  mensagem?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PatientOldService implements IPatientService {
  private apiBaseUrl = environment.apiOldBaseUrl;

  constructor(private http: HttpClient) {}

  getAllPatients(name?: string, page: number = 0, size: number = 10): Observable<{ content: Patient[]; totalElements: number; totalPages: number; }> {
    const requestBody = name ? { pesquisa: name } : {};
    return this.http.post<PacientesApiResponse>(`${this.apiBaseUrl}pacientes.php`, requestBody).pipe(
      map(response => {
        if (response.status === 'success' && response.pacientes) {
          const patients: Patient[] = response.pacientes.map(p => ({
            id: '', // Não fornecido pela API antiga
            tag: p.Tag,
            fullName: p.Nome,
            birthDate: p.Nascimento,
            gender: '',
            referralSource: '',
            insuranceCompany: p.Convenio,
            insurancePlan: ''
          }));
          return {
            content: patients,
            totalElements: patients.length,
            totalPages: 1
          };
        }
        return { content: [], totalElements: 0, totalPages: 1 };
      })
    );
  }

  // Os outros métodos serão implementados depois
  getPatientById(id: string): Observable<Patient> {
    throw new Error('Not implemented');
  }

  getPatientByTag(tag: string): Observable<Patient> {
    const url = `${this.apiBaseUrl}pacienteTag.php?tag=${encodeURIComponent(tag)}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (Array.isArray(response) && response.length > 0) {
          const patientData = response[0];
          return {
            id: patientData.id || '',
            tag: tag,
            fullName: patientData.Nome || '',
            birthDate: patientData.Nascimento || '',
            gender: '',
            referralSource: '',
            insuranceCompany: patientData.Convenio || '',
            insurancePlan: ''
          };
        }
        throw new Error('Paciente não encontrado');
      })
    );
  }

  updatePatient(id: string, patientDetails: Partial<Patient>): Observable<Patient> {
    // O parâmetro 'id' não é usado, pois a API usa 'tag'.
    // O parâmetro 'patientDetails' deve ser convertido para o formato esperado pela API PHP.
    const url = `${this.apiBaseUrl}updateDadosPaciente.php`;
    // Monta o array de alterações conforme esperado pela API PHP
    const updateUrl = `${this.apiBaseUrl}updateDadosPaciente.php`;
    const updates = Object.entries(patientDetails).map(([field, value]) => ({
      titulo: field,
      dado: value,
      alterado: true
    }));
    const formData = new FormData();
    formData.append('tag', patientDetails.tag || id);
    formData.append('dadosPaciente', JSON.stringify(updates));

    return this.http.post<any>(updateUrl, formData).pipe(
      map(response => {
        if (response.status === 'success') {
          return {
            id: '',
            tag: patientDetails.tag || id,
            fullName: patientDetails.fullName || '',
            birthDate: patientDetails.birthDate || '',
            gender: patientDetails.gender || '',
            referralSource: patientDetails.referralSource || '',
            insuranceCompany: patientDetails.insuranceCompany || '',
            insurancePlan: patientDetails.insurancePlan || ''
          };
        }
        throw new Error(response.mensagem || 'Erro ao atualizar paciente');
      })
    );
  }
}
