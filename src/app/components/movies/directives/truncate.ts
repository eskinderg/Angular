import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string, trailadd: boolean): string {
    let trail = '';

    const limit = args ? parseInt(args, 10) : 10;

    if (value === '') return '\u00A0';

    if (trailadd) {
      trail = ' ...';
    }

    if (value) {
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
    return value;
  }
}
