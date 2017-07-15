import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../models/genre';

@Component(
  {
    selector: 'genre-list',
    templateUrl: './genre-list.component.html',
    styleUrls: ['./genre-list.component.scss']
  }
)
export class GenreListComponent {

  @Input()
  genres: Genre[];

  @Output()
  select: EventEmitter<Genre> = new EventEmitter();

  constructor() {
  }

  onSelectGenre(genre: Genre) {
    this.select.emit(genre);
  }

}
