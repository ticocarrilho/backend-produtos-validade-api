import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, actionText: string, action: Function) {
    const snackBarRef = this.snackBar.open(message, actionText, { duration: 3000 });
    snackBarRef.onAction().subscribe(() => {
      action();
    })
  }
}
