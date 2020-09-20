import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './services/produto.service';
import { Produto } from './produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  produtos: Produto[];
  title = 'produtos-api';
  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void{
    this.produtoService.getProdutos().subscribe(res => this.produtos = res)
  }
}
