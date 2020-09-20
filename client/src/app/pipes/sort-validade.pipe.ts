import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../produto';

@Pipe({
  name: 'sortValidade',
})
export class SortValidadePipe implements PipeTransform {
  transform(value: Produto[]): Produto[] {
    return value.sort(
      (a: Produto, b: Produto) => a.validade.getTime() - b.validade.getTime()
    );
  }
}
