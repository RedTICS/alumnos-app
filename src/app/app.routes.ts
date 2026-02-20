import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'alumnos', component: AlumnosComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
