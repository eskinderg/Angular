import { NgModule } from '@angular/core';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './404.component';
import { NotfoundRoutingModule } from './404-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';



@NgModule({
  imports: [CommonModule, NotfoundRoutingModule, SharedModule],
  declarations: [NotfoundComponent],
  exports: [NotfoundComponent]
})
export class NotfoundModule {

}
