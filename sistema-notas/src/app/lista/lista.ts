import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Estudiante } from '../estudiante.model';
import { EstudianteService } from '../estudiante.service';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista implements OnInit {

  estudiantes: Estudiante[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(private servicio: EstudianteService) {}

  ngOnInit(): void {
    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos) => {
        console.log('Estudiantes recibidos:', datos);
        this.estudiantes = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al consultar la API:', err);
        this.error = 'No se pudieron cargar los estudiantes.';
        this.cargando = false;
      }
    });
  }
}