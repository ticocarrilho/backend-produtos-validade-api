import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment-timezone';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Produto } from '../produto';
import { SortValidadePipe } from '../pipes/sort-validade.pipe';
import { ConvertDatePipe } from '../pipes/convert-date.pipe';
import { ErrorAlertService } from './error-alert.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private produtos = new BehaviorSubject<Produto[]>(null);
  readonly sharedProdutos: Observable<Produto[]> = this.produtos.asObservable();

  constructor(
    private http: HttpClient,
    private sortValidade: SortValidadePipe,
    private convertDate: ConvertDatePipe,
    private errorService: ErrorAlertService
  ) {}

  errorHandlerAlert(err: HttpErrorResponse) {
    if (err.status === 400) {
      const { errors } = err.error;
      const errorsMsg: string[] = errors.map((error) => error.msg);
      this.errorService.showErrorDialog(errorsMsg);
    }
    else if(err.status ===0) {
      this.errorService.showErrorDialog(Array.of('Não foi possível conectar ao servidor.'))
    } else {
      this.errorService.showErrorDialog(Array.of(err.error.message));
    }
  }

  addProduto(produto: Produto): Observable<Produto> {
    let produtoResult: Subject<Produto> = new Subject<Produto>();
    this.http.post<Produto>(environment.apiUrl, produto).subscribe(
      (res: Produto) => {
        produtoResult.next(res);
        const newProdutos = [...this.produtos.getValue(), res];
        const dateConvertPipe = this.convertDate.transform(newProdutos);
        this.produtos.next(this.sortValidade.transform(dateConvertPipe));
      },
      (err: HttpErrorResponse) => {
        this.errorHandlerAlert(err);
      }
    );
    return produtoResult.asObservable();
  }

  deleteProduto(produto: Produto): Observable<Produto[]> {
    this.http.delete<Produto>(`${environment.apiUrl}/${produto.id}`).subscribe(
      () => {
        this.produtos.next(
          this.produtos
            .getValue()
            .filter((prod: Produto) => prod.id !== produto.id)
        );
      },
      (err: HttpErrorResponse) => {
        this.errorHandlerAlert(err);
      }
    );
    return this.sharedProdutos;
  }

  editProduto(produto: Produto): Observable<Produto> {
    let alteredProduct: Subject<Produto> = new Subject<Produto>();
    this.http
      .put<Produto>(`${environment.apiUrl}/${produto.id}`, produto)
      .subscribe(
        (res: Produto) => {
          alteredProduct.next(res);
          const alteredProdutos = this.produtos
            .getValue()
            .map((prod: Produto) => {
              if (prod.id === produto.id) {
                prod = produto;
              }
              return prod;
            });
          const dateConvertPipe = this.convertDate.transform(alteredProdutos);
          this.produtos.next(this.sortValidade.transform(dateConvertPipe));
        },
        (err: HttpErrorResponse) => {
          this.errorHandlerAlert(err);
        }
      );
    return alteredProduct.asObservable();
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
      .subscribe(
        (res) => {
          this.produtos.next(res);
        },
        (err: HttpErrorResponse) => {
          this.errorHandlerAlert(err);
        }
      );
    return this.sharedProdutos;
  }
}
