import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../models/genre';

@Component({
    selector: 'app-left-view',
    templateUrl: './left.view.component.html',
    styleUrls: ['./left.view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftViewComponent {
    @Input()
    genres: Genre[];

    @Output()
    select: EventEmitter<Genre> = new EventEmitter();

    constructor() {}

    onSelectGenre(genre: Genre) {
        this.select.emit(genre);
    }
}
