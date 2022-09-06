import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyOrDefault',
})
export class CurrencyOrDefaultPipe implements PipeTransform {
  transform(value: number | undefined | null, ...args: unknown[]): unknown {
    if (value !== undefined && value !== null) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }
    return '';
  }
}
