
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.scss'],
})
export class UserInfoComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.userLoadededEvent
        .subscribe(user => {
          this.user = user;
      });
  }

  startSignoutMainWindow() {
      this.authService.startSignoutMainWindow();
  }

}
