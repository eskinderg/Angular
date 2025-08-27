import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../models/genre';
import { GenreListItemComponent } from './genre-list-item/genre-list-item.component';

@Component({
    selector: 'app-left-view',
    templateUrl: './left.view.component.html',
    styleUrls: ['./left.view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GenreListItemComponent]
})
export class LeftViewComponent {
    @Input()
    genres: Genre[];

    @Output()
    select: EventEmitter<Genre> = new EventEmitter();

    constructor() {}

    // onSelectGenre(genre: Genre) {
    //     // this.select.emit(genre);
    // }
}
