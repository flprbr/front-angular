import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientOldService } from './patient-old.service';
import { Patient } from '../../types/patient.type';

const mockPatient: Patient = {
  id: '1',
  tag: 'TAG123',
  fullName: 'John Doe',
  birthDate: '2000-01-01',
  gender: '',
  referralSource: '',
  insuranceCompany: 'CompanyX',
  insurancePlan: ''
};

fdescribe('PatientOldService', () => {
  let service: PatientOldService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientOldService]
    });
    service = TestBed.inject(PatientOldService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all patients', () => {
    const mockResponse = {
      status: 'success',
      pacientes: [
        {
          Nome: 'John Doe',
          Nascimento: '2000-01-01',
          Tag: 'TAG123',
          Convenio: 'CompanyX'
        }
      ]
    };
    service.getAllPatients().subscribe(res => {
      expect(res.content.length).toBe(1);
      expect(res.content[0].fullName).toBe('John Doe');
    });
    const req = httpMock.expectOne(r => r.url.includes('pacientes.php'));
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should fetch patient by tag', () => {
    const mockResponse = [
      {
        id: '1',
        Nome: 'John Doe',
        Nascimento: '2000-01-01',
        Convenio: 'CompanyX'
      }
    ];
    service.getPatientByTag('TAG123').subscribe(patient => {
      expect(patient.fullName).toBe('John Doe');
      expect(patient.tag).toBe('TAG123');
    });
    const req = httpMock.expectOne(r => r.url.includes('pacienteTag.php'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update patient', () => {
    const mockResponse = { status: 'success', mensagem: 'Dados atualizados com sucesso' };
    service.updatePatient('TAG123', { fullName: 'Jane Doe', tag: 'TAG123' }).subscribe(patient => {
      expect(patient.fullName).toBe('Jane Doe');
      expect(patient.tag).toBe('TAG123');
    });
    const req = httpMock.expectOne(r => r.url.includes('updateDadosPaciente.php'));
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
