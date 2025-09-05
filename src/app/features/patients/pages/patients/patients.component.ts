import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../../../shared/main-layout/main-layout.component';
import { SearchBarComponent } from '../../../../shared/search-bar/search-bar.component';


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
export class PatientsComponent {

  
}
