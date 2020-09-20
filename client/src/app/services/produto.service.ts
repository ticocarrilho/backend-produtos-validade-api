import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment-timezone';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Produto } from '../produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(environment.apiUrl).pipe(
      map((produtos: Produto[]) => {
        produtos.map((produto: Produto) => {
          produto.validade = new Date(moment.tz(produto.validade, "America/Recife").format());
          return produto;
        });
        return produtos;
      })
    );
  }
}
