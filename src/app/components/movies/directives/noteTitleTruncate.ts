import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteTitleTruncate'
})
export class NoteTitleTruncatePipe implements PipeTransform {
  transform(value: string, args: string, trailadd: boolean): string {
    // Cleaning up html tags
    const temp = document.createElement('div');
    temp.innerHTML = value;
    value = temp.textContent || temp.innerText || '';

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
