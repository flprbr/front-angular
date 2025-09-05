import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { PatientsComponent } from './features/patients/pages/patients/patients.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },

    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "patients",
        component: PatientsComponent,
        canActivate: [AuthGuard]
    }
];
