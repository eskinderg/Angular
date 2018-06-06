import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged,switchMap, map, takeUntil, tap } from 'rxjs/operators';
// import { environment } from '../../../../../environments/environment';

import { ConfirmService } from '../../../theme/components/modal/confirm.service';

@Injectable()
export class ApiService {

  constructor(http: HttpClient, private confirmService: ConfirmService) {

  }

  ShowDialog(message: string) {

  }

  handleError (error: Response | any) {
    // console.error('EventDataApiService Error::handleError', error);

    // this.confirmService.openInfoModal({
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
