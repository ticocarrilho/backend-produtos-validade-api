import { Component, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Produto } from '../../produto';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from '../../services/produto.service';
import { DeleteProdDialogComponent } from '../delete-prod-dialog/delete-prod-dialog.component';
import { EditProdDialogComponent } from '../edit-prod-dialog/edit-prod-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  showSpinner: Boolean;
  dataSource: MatTableDataSource<Produto> = null;
  tableColumns: string[] = ['nome', 'preco', 'validade', 'acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  faPen = faPen;
  faTrash = faTrashAlt;

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    console.log(this.dataSource)
    this.produtoService.getProdutos().subscribe((res) => {
      if (this.dataSource === null) {
        this.dataSource = new MatTableDataSource<Produto>(res);
      } else {
        this.dataSource.data = res;
      }
      this.dataSource.paginator = this.paginator;
      this.showSpinner = false;
    });
  }

  deleteProduto(produto: Produto): void {
    const dialogRef = this.dialog.open(DeleteProdDialogComponent, {
      width: '400px',
      data: produto,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.produtoService.deleteProduto(produto);
        this.snackBarService.showSnackBar(
          'Produto excluído com sucesso.',
          'Desfazer',
          () => this.produtoService.addProduto(produto)
        );
      }
    });
  }

  editProduto(produto: Produto): void {
    this.dialog.open(EditProdDialogComponent, {
      width: '400px',
      data: produto,
    });
  }

  isExpired(produto: Produto): boolean {
    const validade = moment(produto.validade);
    const today = moment.now();
    return validade.isSameOrBefore(today, 'd');
  }

  isExpirationNear(produto: Produto): boolean {
    const validade = moment(produto.validade);
    const today = moment.now();
    if (validade.diff(today, 'days') < 7) {
      return true;
    }
    return false;
  }
}
