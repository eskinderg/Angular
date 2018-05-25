import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="progress"> <div class="indeterminate"></div>  </div>`,
  styleUrls: ['appLoading.component.scss']
})
export class AppLoadingComponent {
}
