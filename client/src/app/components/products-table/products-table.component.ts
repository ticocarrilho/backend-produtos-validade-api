import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Produto } from '../../produto';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  @Input() produtos: Produto[];
  tableColumns: string[] = ['nome', 'preco', 'validade', 'acoes']
  faPen = faPen;
  faTrash = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
    this.produtos.sort((a: Produto, b: Produto) => a.validade.getTime() - b.validade.getTime())
  }

  isExpirationNear(produto: Produto): boolean {
    const validade = moment(produto.validade);
    const today = moment.now();
    if(validade.diff(today, 'days') < 7) {
      return true;
    }
    return false;
  }

}
