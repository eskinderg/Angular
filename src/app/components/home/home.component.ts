import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { SlideAnimation } from '../shared/animations/animations';
import { Event } from '../../theme/components/event/event';
import { MoviesApiService } from '../movies/movies.service/movies.api.service';
import { Tv } from '../movies/models/tv';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@routerFadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  public events: Event[];
  public tvs: Tv[];
  public chartData: Array<any>;

  constructor(private route: ActivatedRoute, private moviesApiService: MoviesApiService) { }

  ngOnInit() {

    this.events = this.route.snapshot.data['events'];
    this.tvs = this.route.snapshot.data['tvs'];

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
