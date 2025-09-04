import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MainLayoutComponent } from '../../components/main-layout/main-layout.component';

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
