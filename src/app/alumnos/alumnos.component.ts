import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./alumnos.component.css']
})

export class AlumnosComponent implements OnInit {
  carga: boolean = false;
  alumnos: any[] = [];
  dni: string = '';
  nuevoAlumno: any = { dni: '', apellido_nombres: '', fecha_nacimiento: '', nivel: '', esquema_completo: false };
  modo: string = this.carga ? 'Edición' : 'Consulta';
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
    console.log('Payload:', pay);
    this.carga = (pay.username === 'carga');
  }

  buscarAlumno() {
    this.buscando = true;
    if (!this.dni) {
      console.log('DNI:', this.dni)
      this.alumnos = [];
      this.mostrarDatos = false;
    } else {
      console.log('Buscando DNI:', this.dni)
      this.api.getAlumno(this.dni).subscribe(data => {
        this.alumnos = [data];
        this.esquema_completo = this.alumnos[0] ? this.alumnos[0].esquema_completo : false;
        this.mostrarDatos = this.alumnos.length ? true : false;
        console.log('Alumnos:', this.alumnos)
      });
    }
  }

  guardar(alumno: any) {
    this.api.editarAlumno(alumno.Id, alumno).subscribe(() => {
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
    console.log('limpiar():', this.dni);
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


