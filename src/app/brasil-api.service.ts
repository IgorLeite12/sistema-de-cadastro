import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estados } from './brasil-api.models'; 

@Injectable({ 
  providedIn: 'root'
})
export class BrasilApiService {

  baseURL: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  listarUFs(): Observable<Estados[]>{
    const path = '/ibge/uf/v1';
    return this.http.get<Estados[]>(this.baseURL + path);
  }
}
