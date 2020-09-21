import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss'],
})
export class ProductInputComponent implements OnInit {
  form: FormGroup;
  minDate: Date;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  nomeFormControl = new FormControl('', [Validators.required]);

  precoFormControl = new FormControl(null, [
    Validators.required,
    Validators.min(1.0),
  ]);

  validadeFormControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.form = this.formBuilder.group({
      nome: this.nomeFormControl,
      preco: this.precoFormControl,
      validade: this.validadeFormControl,
    });
  }

  onSubmit(produtoInfo: Produto) {
    console.log(this.validadeFormControl);
    // let produto: Produto = produtoInfo;
    // this.produtoService.addProduto(produto).subscribe((res: Produto) => {
    //   this.formGroupDirective.resetForm();
    //   this.snackBar.open('Produto criado com sucesso.', 'Desfazer', {
    //     duration: 3000,
    //   });
    // });
  }

  ngOnInit(): void {}
}
