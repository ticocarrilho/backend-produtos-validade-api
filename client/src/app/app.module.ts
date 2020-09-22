import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  CurrencyMaskConfig,
  CurrencyMaskModule,
  CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';

import { AppComponent } from './app.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { SortValidadePipe } from './pipes/sort-validade.pipe';
import { ConvertDatePipe } from './pipes/convert-date.pipe';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { DeleteProdDialogComponent } from './components/delete-prod-dialog/delete-prod-dialog.component';
import { getPortuguesePaginatorIntl } from './getPortuguesePaginatorIntl';
import { EditProdDialogComponent } from './components/edit-prod-dialog/edit-prod-dialog.component';

registerLocaleData(localePt);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    SortValidadePipe,
    ConvertDatePipe,
    ProductInputComponent,
    DeleteProdDialogComponent,
    EditProdDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDialogModule,
    MatInputModule,
    CurrencyMaskModule,
    MatPaginatorModule,
    MatButtonModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    SortValidadePipe,
    ConvertDatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
