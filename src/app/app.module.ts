import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

// Import del módulo de rutas
import { routes } from './app-routing.module';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule),
        provideHttpClient(),
        provideRouter(routes)
    ]
}).catch(err => console.error(err));
