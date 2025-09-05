import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../../../shared/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimaryImputComponent } from '../../../../shared/primary-imput/primary-imput.component';
import { LoginService } from '../../../../services/login/login.service';

interface SignupForm {
  username: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
  fullName: FormControl,
  role: FormControl,
  cpf: FormControl,
  canSign: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryImputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;


  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService

  ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      fullName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      canSign: new FormControl(false)
    });

  }

  submit() {
    this.loginService.signup(
      this.signupForm.value.username,
      this.signupForm.value.password,
      this.signupForm.value.fullName,
      this.signupForm.value.role,
      this.signupForm.value.cpf,
      this.signupForm.value.canSign
    ).subscribe({
      next: () => {
        this.toastService.success("Login successful")
       

      },
      error: (err) => {
        console.error('Signup error:', err);
        this.toastService.error("Erro Inesperado! Tente novamente mais tarde.");
      },
    });
  }

  navigate() {
    this.router.navigate(["login"]);
  }


}
