import { LoggingService } from '../error/loggingservice';
import { ToastService } from '../shared/toast/toast.service';

export function initializeErrorLogger(errorLog: LoggingService, toastService: ToastService): () => void {
    return () => {
        errorLog.onError.subscribe((error) => {
            toastService.showError(error['message'], error['statusText'] ? error['statusText'] : 'Error');
        });
    };
}
