import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';

// import { environment } from '../../../../../environments/environment';

// import { ConfirmService } from '../../../fragments/components/dialog/confirm.service';

@Injectable()
export class ApiService {
  constructor() {}

  ShowDialog() {}

  handleError(error: Response | any) {
    // console.error('EventDataApiService Error::handleError', error);

    // this.confirmService.openInfoDialog({
    //   title: 'Title',
    //   message: 'asdfasdfjalsdfkajlsdkfjalsdkf'
    // }).then(() => {
    //   // this.store.dispatch(new EventsActions.deleteEvent(event));
    // }, () => {
    //   console.log();
    // });

    return observableThrowError(error);
  }
}
