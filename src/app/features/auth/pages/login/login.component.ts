import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { DefaultLoginLayoutComponent } from '../../../../shared/default-login-layout/default-login-layout.component';
import { PrimaryImputComponent } from '../../../../shared/primary-imput/primary-imput.component';
import { LoginService } from '../../../../services/login/login.service';

interface LoginForm {
  user: FormControl,
  password: FormControl
}
  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryImputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService

  ) {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  submit() {
  this.loginService.login(this.loginForm.value.user, this.loginForm.value.password).subscribe({
    next: () => {
      this.toastService.success("Login successful")
       this.router.navigate(["patients"]);

    },
    error: () =>this.toastService.error("Erro Inesperado! Tente novamente mais tarde."),
  })  
}

  navigate() {
    this.router.navigate(["signup"]);
  }


}
