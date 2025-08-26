import { Component, Input, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

type InputTypes = 'text' | 'email' | 'password'

@Component({
  selector: 'app-primary-imput',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './primary-imput.component.html',
  styleUrl: './primary-imput.component.scss'
})
export class PrimaryImputComponent {
  @Input() type: InputTypes = 'text';
  @Input() formName: string = " ";
  @Input() placeholder: string = " ";
  @Input() label: string = " ";

}
