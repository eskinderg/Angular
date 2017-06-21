import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SlideAnimation }   from '../shared/animations';
import { AuthService } from '../shared/services/auth/auth.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  // providers: [TodoDataService]
  animations: [ SlideAnimation ],
  host: { '[@routerAnimation]': '' }
})
export class HomeComponent  {

  constructor() { }

  ngOnInit() {

    // Observable.fromPromise(this.authService.mgr.signoutRedirect())
    //           .subscribe((user) => {
    //             console.log('observalbe understood to some extent');
    //               // this.authService.userLoadededEvent.emit(user); //Notifying User has loggedIn Successfully
    //               // this.router.navigate(['/']);
    //           },(error)=>{
    //               console.log(error);
    //               // this.router.navigate(['/404']);
    //           });

  }

}
