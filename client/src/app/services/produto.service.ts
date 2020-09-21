import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  readonly sharedProdutos: Observable<Produto[]> = this.produtos.asObservable();

  constructor(
    private http: HttpClient,
    private sortValidade: SortValidadePipe,
    private convertDate: ConvertDatePipe
  ) {}

  addProduto(produto: Produto): Observable<Produto> {
    let produtoResult: Subject<Produto> = new Subject<Produto>();
    this.http
      .post<Produto>(environment.apiUrl, produto)
      .subscribe((res: Produto) => {
        produtoResult.next(res);
        const newProdutos = [...this.produtos.getValue(), res];
        const dateConvertPipe = this.convertDate.transform(newProdutos);
        this.produtos.next(this.sortValidade.transform(dateConvertPipe));
      });
    return produtoResult.asObservable();
  }

  deleteProduto(produto: Produto): Observable<Produto[]> {
    this.http
      .delete<Produto>(`${environment.apiUrl}/${produto.id}`)
      .subscribe(() => {
        this.produtos.next(this.produtos.getValue().filter((prod: Produto) => prod.id !== produto.id))
      });
    return this.sharedProdutos;
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
