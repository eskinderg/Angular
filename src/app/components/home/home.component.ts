import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { SlideAnimation } from '../shared/animations/animations';
import { Tv } from '../movies/models/tv';
import { EventDataService } from '../../theme/components/event/event.data.service/event.data.service';

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
  public events$;

  constructor(private route: ActivatedRoute,
              private eventDataService: EventDataService) { }

  ngOnInit() {
    this.tvs = this.route.snapshot.data['tvs'];
    this.events$ = this.eventDataService.getAllEvents();
  }

}

