import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

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
