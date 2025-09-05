import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../../../shared/main-layout/main-layout.component';
import { SearchBarComponent } from '../../../../shared/search-bar/search-bar.component';
import { PatientNewService } from '../../../../services/patient/patient-new.service';
import { PatientOldService } from '../../../../services/patient/patient-old.service';


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    MainLayoutComponent,
    SearchBarComponent
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {

  constructor(
    private patientOldService: PatientOldService,
    private patientNewService: PatientNewService
  ) {}

  // Testando api

  ngOnInit() {
    // Buscar pacientes na oldApi
    this.patientOldService.getAllPatients().subscribe({
      next: (result) => console.log('Pacientes da oldApi:', result),
      error: (err) => console.error('Erro oldApi:', err)
    });

    // Buscar pacientes na newApi
    this.patientNewService.getAllPatients().subscribe({
      next: (result) => console.log('Pacientes da newApi:', result),
      error: (err) => console.error('Erro newApi:', err)
    });
  }
}