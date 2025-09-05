import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientNewService } from './patient-new.service';
import { Patient } from '../../types/patient.type';

const mockPatient: Patient = {
  id: '1',
  tag: 'TAG123',
  fullName: 'John Doe',
  birthDate: '2000-01-01',
  gender: 'M',
  referralSource: 'Doctor',
  insuranceCompany: 'CompanyX',
  insurancePlan: 'PlanA'
};

fdescribe('PatientNewService', () => {
  let service: PatientNewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientNewService]
    });
    service = TestBed.inject(PatientNewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch patient by id', () => {
    service.getPatientById('1').subscribe(patient => {
      expect(patient).toEqual(mockPatient);
    });
    const req = httpMock.expectOne('http://192.168.1.165:8080/api/patients/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPatient);
  });

  it('should fetch patient by tag', () => {
    service.getPatientByTag('TAG123').subscribe(patient => {
      expect(patient).toEqual(mockPatient);
    });
    const req = httpMock.expectOne('http://192.168.1.165:8080/api/patients/tag/TAG123');
    expect(req.request.method).toBe('GET');
    req.flush(mockPatient);
  });

  it('should fetch all patients', () => {
    const mockResponse = { content: [mockPatient], totalElements: 1, totalPages: 1 };
    service.getAllPatients().subscribe(res => {
      expect(res.content.length).toBe(1);
      expect(res.content[0]).toEqual(mockPatient);
    });
    const req = httpMock.expectOne(r => r.url === 'http://192.168.1.165:8080/api/patients');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update patient', () => {
    service.updatePatient('1', { fullName: 'Jane Doe' }).subscribe(patient => {
      expect(patient.fullName).toBe('Jane Doe');
    });
    const req = httpMock.expectOne('http://192.168.1.165:8080/api/patients/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockPatient, fullName: 'Jane Doe' });
  });
});
