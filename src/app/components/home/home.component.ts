import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { SlideAnimation } from '../shared/animations/animations';
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

  public events$;

  constructor(private route: ActivatedRoute, private eventDataService: EventDataService) {
    this.events$ = eventDataService.getAllEvents();
  }

  ngOnInit() { }

}
