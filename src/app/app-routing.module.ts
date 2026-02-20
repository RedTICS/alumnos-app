import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlumnosComponent } from './alumnos/alumnos.component';

export const routes = [
    { path: '', component: LoginComponent },
    { path: 'alumnos', component: AlumnosComponent },
    { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideRouter(routes)
    ]
}).catch(err => console.error(err));
