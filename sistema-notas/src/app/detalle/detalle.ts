import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Estudiante } from '../estudiante.model';
import { EstudianteService } from '../estudiante.service';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {

  estudiante?: Estudiante;
  suma: number = 0;
  promedio: number = 0;
  estado: string = '';
  observacion: string = '';
  error: string = '';

  constructor(
    private ruta: ActivatedRoute,
    private servicio: EstudianteService
  ) {}

  ngOnInit(): void {

    const id = Number(this.ruta.snapshot.paramMap.get('id'));

    this.servicio.obtenerEstudiantes().subscribe({
      next: (datos) => {

        this.estudiante = datos.find(e => e.id === id);

        if (!this.estudiante) {
          this.error = 'Estudiante no encontrado';
          return;
        }

        this.suma = this.estudiante.nota1 +
                    this.estudiante.nota2 +
                    this.estudiante.nota3;

        this.promedio = this.suma / 3;

        this.estado = this.promedio >= 13
          ? 'Aprobado'
          : 'Desaprobado';

        if (this.promedio >= 17) {
          this.observacion = 'Excelente';
        } else if (this.promedio >= 13) {
          this.observacion = 'Regular';
        } else {
          this.observacion = 'En riesgo';
        }
      },
      error: () => {
        this.error = 'Error al consultar la API';
      }
    });
  }
}