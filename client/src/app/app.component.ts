import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'produtos-api';
  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void{
    this.produtoService.getProdutos().subscribe(res => console.log(res))
  }
}
