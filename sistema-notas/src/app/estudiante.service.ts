import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Estudiante } from './estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private api = 'https://careli2021.github.io/api_examen/api/estudiante.json';

  private estudiantes$?: Observable<Estudiante[]>;

  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<Estudiante[]> {
    if (!this.estudiantes$) {
      this.estudiantes$ = this.http
        .get<Estudiante[]>(this.api)
        .pipe(shareReplay(1));
    }

    return this.estudiantes$;
  }
}