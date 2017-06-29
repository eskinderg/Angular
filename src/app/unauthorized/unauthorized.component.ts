import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private location: Location, private service: AuthService) { }

  ngOnInit() {
  }

  login() {
    try {
      this.service.startSigninMainWindow();
    } catch (err) {
      console.log(err);
    }
  }

  goback() {
    this.location.back();
  }

  startSignoutMainWindow() {
    this.service.startSignoutMainWindow();
}

}
