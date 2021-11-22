import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
// import { SlideAnimation } from '../shared/animations/animations';
import { Tv } from '../movies/models/tv';
import { EventApiService } from '../../theme/components/event/event.data.service/event.api.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [fadeInAnimation]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  public tvs: Tv[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tvs = this.route.snapshot.data['tvs'];
  }

}
