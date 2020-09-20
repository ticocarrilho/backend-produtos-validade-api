import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment-timezone';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Produto } from '../produto';
import { SortValidadePipe } from '../pipes/sort-validade.pipe';
import { ConvertDatePipe } from '../pipes/convert-date.pipe';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private produtos = new BehaviorSubject<Produto[]>(null);
  sharedProdutos = this.produtos.asObservable();
  constructor(private http: HttpClient, private sortValidade: SortValidadePipe, private convertDate: ConvertDatePipe) {}

  addProduto(produto: Produto): void {
    this.http
      .post<Produto>(environment.apiUrl, produto)
      .subscribe((res: any) => {
        const dateConvertPipe = this.convertDate.transform(this.produtos.getValue().concat(res.product))
        this.produtos.next(this.sortValidade.transform(dateConvertPipe))
      });
  }

  getProdutos(): Observable<Produto[]> {
    this.http
      .get<Produto[]>(environment.apiUrl)
      .pipe(
        map((produtos: Produto[]) => {
          produtos.map((produto: Produto) => {
            produto.validade = new Date(
              moment.tz(produto.validade, 'America/Recife').format()
            );
            return produto;
          });
          return produtos;
        }),
        map((produtos: Produto[]) =>
          produtos.sort(
            (a: Produto, b: Produto) =>
              a.validade.getTime() - b.validade.getTime()
          )
        )
      )
      .subscribe((res) => {
        this.produtos.next(res);
      });
    return this.sharedProdutos;
  }
}
