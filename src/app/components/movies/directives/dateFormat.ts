import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'format',
    standalone: true
})
export class FormatDatePipe implements PipeTransform {
    transform(value: string): string {
        return new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
}
