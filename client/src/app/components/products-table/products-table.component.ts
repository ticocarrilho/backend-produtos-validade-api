import { Component, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Produto } from '../../produto';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  showSpinner: Boolean;
  dataSource: MatTableDataSource<Produto>;
  tableColumns: string[] = ['nome', 'preco', 'validade', 'acoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  faPen = faPen;
  faTrash = faTrashAlt;
  

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.produtoService.getProdutos().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Produto>(res);
      this.dataSource.paginator = this.paginator;
      this.showSpinner = false;
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
