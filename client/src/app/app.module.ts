import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { SortValidadePipe } from './pipes/sort-validade.pipe';
import { ConvertDatePipe } from './pipes/convert-date.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    SortValidadePipe,
    ConvertDatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-Br' }, SortValidadePipe, ConvertDatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
