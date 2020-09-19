import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto> {
    return this.http.get<Produto>(environment.apiUrl);
  }
}
