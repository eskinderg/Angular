import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Genre } from '../../models/genre';
import { MoviesApiService } from '../../movies.service/movies.api.service';

@Component({
  selector: 'app-genre-list-item',
  templateUrl: './genre-list-item.component.html',
  styleUrls: ['./genre-list-item.component.scss']
})
export class GenreListItemComponent implements AfterViewInit  {

  @Input() genre: Genre;

  @Output()
  select: EventEmitter<Genre> = new EventEmitter();

  constructor(private moviesApiService: MoviesApiService) { }

  ngAfterViewInit() {
    // this.moviesApiService.getMoviesCountByGenre(this.genre.id.toString())
    //   .subscribe(res => {
    //     this.genre.total_results = res;
    //   });
  }

  selectGenre(genre: Genre, $event: any) {
    $event.preventDefault();
    this.select.emit(genre);
  }
}
