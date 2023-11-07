import { Component, ElementRef } from '@angular/core';
import {ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild('spinnerElement', { static: true }) spinnerElement: ElementRef;

  constructor() { }

}
