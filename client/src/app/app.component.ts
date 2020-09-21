import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { Produto } from './produto';
import { ProdutoService } from './services/produto.service';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(ProductInputComponent) inputComponent: ProductInputComponent;
  title = 'produtos-api';
  constructor(
    private snackBarService: SnackbarService,
    private produtoService: ProdutoService
  ) {}

  onSubmit = (produto: Produto) => {
    this.produtoService.addProduto(produto).subscribe((res: Produto) => {
      this.inputComponent.formGroupDirective.resetForm();
      this.snackBarService.showSnackBar(
        'Produto criado com sucesso.',
        'Desfazer',
        () => this.produtoService.deleteProduto(res)
      );
    });
  };
  ngOnInit() {}
}
