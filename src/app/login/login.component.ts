import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CONFIG } from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule]
})

export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;
  title = CONFIG.APP_NAME;

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    if (this.username && this.password) {
      this.auth.login(this.username, this.password).subscribe({
        next: () => this.router.navigate(['/alumnos']),
        error: () => {
          this.error = 'Usuario o contraseña incorrectos';
          this.loading = false;
        }
      });
    }
  }

}
