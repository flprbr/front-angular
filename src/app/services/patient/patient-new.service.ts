
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatientService } from './patient.service.interface';
import { Patient } from '../../types/patient.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientNewService implements IPatientService {
  private apiUrl = environment.apiNewUrl + "patients";

   constructor(private http: HttpClient) {}

  // Solução 1: Retornar HttpHeaders consistentemente
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders();
    
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  // Alternativa para getAuthHeaders usando objeto simples
  private getAuthHeadersObject(): { [key: string]: string } {
    const token = sessionStorage.getItem('auth-token');
    
    if (token) {
      return { 'Authorization': `Bearer ${token}` };
    }
    
    return {}; // Objeto vazio é válido quando não há headers
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      responseType: 'json' // Garantir que seja JSON
    });
  }

  getPatientByTag(tag: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/tag/${tag}`, {
      headers: this.getAuthHeaders(),
      responseType: 'json'
    });
  }

  getAllPatients(
    name?: string, 
    page: number = 0, 
    size: number = 10
  ): Observable<{ content: Patient[]; totalElements: number; totalPages: number; }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<{ content: Patient[]; totalElements: number; totalPages: number; }>(
      this.apiUrl, 
      {
        params,
        headers: this.getAuthHeaders(),
        responseType: 'json' // Explicitamente definir como JSON
      }
    );
  }

  updatePatient(id: string, patientDetails: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patientDetails, {
      headers: this.getAuthHeaders(),
      responseType: 'json'
    });
  }
}