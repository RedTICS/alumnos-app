import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  imports: [FormsModule, CommonModule]
})

export class AlumnosComponent implements OnInit {
  carga: boolean = false;
  alumnos: any[] = [];
  dni: string = '';
  nuevoAlumno: any = { dni: '', apellido_nombres: '', fecha_nacimiento: '', nivel: '', esquema_completo: false };
  modo: string = 'Consulta';
  mostrarDatos = false;
  esquema_completo: boolean = false;
  buscando: boolean = false;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const pay = this.auth.getPayload();
    this.carga = (pay.role === 'write');
    this.modo = this.carga ? 'Edición' : 'Consulta';
  }

  buscarAlumno() {
    this.buscando = true;
    if (!this.dni) {
      this.alumnos = [];
      this.mostrarDatos = false;
    } else {
      this.api.getAlumno(this.dni).subscribe(data => {
        this.alumnos = [data];
        this.esquema_completo = this.alumnos[0] ? this.alumnos[0].esquema_completo : false;
        this.mostrarDatos = this.alumnos.length ? true : false;
      });
    }
  }

  guardar(alumno: any) {
    this.api.editarAlumno(alumno.DNI, alumno).subscribe(() => {
      this.esquema_completo = alumno.esquema_completo;
      alert('Alumno actualizado');
    });
  }

  fechaNac(fecha: string) {
    if (fecha == null) { return '' };
    const f = fecha.split('/');
    const r = f[1] + '/' + f[0] + '/' + f[2];
    return r;
  }

  limpiar() {
    this.alumnos = [];
    this.mostrarDatos = false;
    this.buscando = false;
  }

  mensage() {
    let msg;
    if (this.alumnos[0]) {
      msg = "Alumno encontrado.";
    } else if (!this.alumnos[0] && this.dni && this.buscando) {
      msg = "No se encontraron alumnos.";
    } else {
      msg = 'Ingrese un DNI para buscar.';
    }
    return msg;
  }

  estilo() {
    if (!this.alumnos[0] && this.dni && this.buscando) {
      return "alert-warning";
    } else {
      return "alert-info";
    }
  }

  soloNumeros(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}


