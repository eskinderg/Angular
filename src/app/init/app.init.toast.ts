import { LoggingService } from '../error/loggingservice';
import { ToastService } from '../shared/toast/toast.service';

export function initializeToast(errorLog: LoggingService, toastService: ToastService): () => void {
  return () => {
    errorLog.onError.subscribe(error => {
      toastService.showDanger(error['message'], error['statusText'] ? error['statusText'] : 'Error');
    });
  };
}
