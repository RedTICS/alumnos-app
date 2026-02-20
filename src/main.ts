// import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { AppComponent } from './app/app.component';
// import { LoginComponent } from './app/login/login.component';
// import { AlumnosComponent } from './app/alumnos/alumnos.component';

// // Definición de rutas
// const routes = [
//   { path: '', component: LoginComponent },       // ruta principal → login
//   { path: 'alumnos', component: AlumnosComponent },
//   { path: '**', redirectTo: '' }                 // fallback
// ];

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes)
//   ]
// }).catch(err => console.error(err));

import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/jwt.interceptor';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideHttpClient(),
  ]
});