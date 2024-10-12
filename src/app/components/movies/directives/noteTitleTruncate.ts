import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/app/models/note';

@Pipe({
    name: 'noteTitleTruncate',
    standalone: true
})
export class NoteTitleTruncatePipe implements PipeTransform {
    transform(note: Note, args: string, trailadd: boolean): string {
        // Cleaning up html tags
        const temp = document.createElement('div');

        temp.innerHTML = note.header ? note.header : note.text;

        const value = temp.textContent || temp.innerText || '';

        let trail = '';

        const limit = args ? parseInt(args, 10) : 10;

        if (value.trim() === '') {
            return 'Untitled';
        }

        if (trailadd) {
            trail = ' ...';
        }

        if (value) {
            return value.length > limit ? value.substring(0, limit) + trail : value;
        }
        return value;
    }
}
