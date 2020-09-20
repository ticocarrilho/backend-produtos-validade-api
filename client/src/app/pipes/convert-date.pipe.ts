import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
import { Produto } from '../produto';

@Pipe({
  name: 'convertDate',
})
export class ConvertDatePipe implements PipeTransform {
  transform(value: Produto[]): Produto[] {
    return value.map((produto: Produto) => {
      produto.validade = new Date(
        moment.tz(produto.validade, 'America/Recife').format()
      );
      return produto;
    });
  }
}
