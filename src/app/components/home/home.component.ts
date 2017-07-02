import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { SlideAnimation } from '../shared/animations/animations';
import { AuthService } from '../shared/services/auth/auth.service';
import { Todo } from '../shared/components/todo/todo';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
})
export class HomeComponent implements OnInit  {

  public todos: Todo[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.todos = this.route.snapshot.data['todos'];
  }

}
