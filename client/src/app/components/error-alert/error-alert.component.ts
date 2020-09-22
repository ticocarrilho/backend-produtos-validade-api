import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
})
export class ErrorAlertComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ErrorAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {}

  ngOnInit(): void {}
}
