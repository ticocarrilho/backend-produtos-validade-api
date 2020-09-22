import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Produto } from '../../produto';
import { FormService } from '../../services/form.service';
import { ProdutoService } from '../../services/produto.service';
import { ProductInputComponent } from '../product-input/product-input.component';
@Component({
  selector: 'app-edit-prod-dialog',
  templateUrl: './edit-prod-dialog.component.html',
  styleUrls: ['./edit-prod-dialog.component.scss'],
})
export class EditProdDialogComponent {
  @ViewChild(ProductInputComponent) public productForm: ProductInputComponent;

  constructor(
    public dialogRef: MatDialogRef<EditProdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private formService: FormService,
    private produtoService: ProdutoService,
    private snackBarService: SnackbarService
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
  
  onSubmitClick() {
    this.formService.onFormSubmitted.emit('submit')
  }

  onSubmit = (produto: Produto) => {
    Object.assign(produto, { id: this.data.id })
    console.log(produto);
    this.produtoService.editProduto(produto).subscribe(() => {
      this.dialogRef.close()
      this.snackBarService.showSnackBar(
        'Produto editado com sucesso.',
        'Desfazer',
        () => this.produtoService.editProduto(this.data)
      );
    });
  }
}
