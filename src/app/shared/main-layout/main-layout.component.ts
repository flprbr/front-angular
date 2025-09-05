import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    ɵEmptyOutletComponent
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
    @Input() title: string = " ";

}
