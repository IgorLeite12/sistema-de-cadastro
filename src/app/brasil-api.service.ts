import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State, City } from './brasil-api.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {

  baseURL: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  listarUFs(): Observable<State[]>{
    const path = '/ibge/uf/v1';
    return this.http.get<State[]>(this.baseURL + path);
  }

  listarMunicipios(uf: string) : Observable<City[]> {
    const path = '/ibge/municipios/v1/' + uf;
    return this.http.get<City[]>(this.baseURL + path);
  }
}
