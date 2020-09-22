import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../../produto';

@Component({
  selector: 'app-delete-prod-dialog',
  templateUrl: './delete-prod-dialog.component.html',
  styleUrls: ['./delete-prod-dialog.component.scss'],
})
export class DeleteProdDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto
  ) {}
  
  onNoClick() {
    this.dialogRef.close();
  }
}
