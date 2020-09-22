import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorAlertComponent } from '../components/error-alert/error-alert.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlertService {
  constructor(public dialog: MatDialog) {}

  showErrorDialog(errors: string[]) {
    this.dialog.open(ErrorAlertComponent, {
      width: '600px',
      data: errors,
    });
  }
}
