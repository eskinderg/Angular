import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { SlideAnimation } from '../shared/animations/animations';
import { Event } from '../../theme/components/event/event';
import { MoviesApiService } from '../movies/movies.service/movies.api.service';
import { Tv } from '../movies/models/tv';
import { EventDataService } from '../../theme/components/event/event.data.service/event.data.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [fadeInAnimation]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  public events: Event[];
  public tvs: Tv[];
  public chartData: Array<any>;
  public events$;

    constructor(private route: ActivatedRoute,
                private moviesApiService: MoviesApiService,
                private eventDataService: EventDataService) {
    }

  ngOnInit() {

    this.tvs = this.route.snapshot.data['tvs'];
    this.events$ = this.eventDataService.getAllEvents();

    setTimeout(() => {
      this.generateData();
      setInterval(() => this.generateData(), 3000);
    }, 3000);

  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
