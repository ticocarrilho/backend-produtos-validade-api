import { Component, OnInit, Input } from '@angular/core';
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
  }

}
